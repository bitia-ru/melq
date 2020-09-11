class Post
  attr_accessor(
    :title,
    :content,
    :published,
    :can_comment,
    :add_likes_auth_only,
    :num_of_likes,
    :num_of_reposts,
    :num_of_views,
    :slug,
    :seo_title,
    :seo_kw,
    :created_at,
    :updated_at
  )

  def initialize(*args)
    post = args.empty? ? {} : args[0]
    @title = post[:title]
    @content = post[:content]
    @published = post.fetch(:published, false)
    @can_comment = post.fetch(:can_comment, 'authorized_only')
    @add_likes_auth_only = post.fetch(:add_likes_auth_only, false)
    @num_of_likes = post.fetch(:num_of_likes, 0)
    @num_of_reposts = post.fetch(:num_of_reposts, 0)
    @num_of_views = post.fetch(:num_of_views, 0)
    @slug = post[:slug]
    @seo_title = post[:seo_title]
    @seo_kw = post[:seo_kw] || []
    @created_at = post[:created_at]&.to_datetime
    @updated_at = post[:updated_at]&.to_datetime
  end

  def self.posts_dir
    FileUtils.mkdir_p Settings.postsDir unless Dir.exist?(Settings.postsDir)

    Settings.postsDir
  end

  def self.all
    slugs.map do |slug|
      Post.get_by_slug(slug)
    end
  end

  def self.find_by(*args)
    params = args.empty? ? {} : args[0]

    raise ArgumentError, 'Args empty' if params.keys.empty?

    primary_key = params.keys.first
    raise StandardError, 'Not Implemented' if params.keys.length > 1 || primary_key != :slug

    Post.get_by_slug(params[:slug])
  end

  def attributes
    as_json
  end

  def tags
    PostsTag.where(post_slug: slug).map(&:tag)
  end

  def images
    images_list.each_with_index.map do |img, id|
      {
        id: id,
        filename: img,
        url: "/api/v1/posts/#{slug}/images/#{img}"
      }
    end
  end

  def images_attachments_attributes=(*args)
    params = args.empty? ? [] : args[0]
    raise StandardError, 'Args empty' if params.empty?

    list = images_list
    dir = "#{Post.posts_dir}/#{slug}"
    params.each do |image|
      next unless image.include?('id')

      if image.include?('_destroy') && image['_destroy'] == 'true'
        FileUtils.rm("#{dir}/#{list[image['id'].to_i]}")
      else
        File.rename("#{dir}/#{list[image['id'].to_i]}", "#{dir}/#{image['filename']}")
      end
    end
  end

  def comments
    Comment.where(post_slug: slug)
  end

  def valid?(context = :create)
    return false unless slug.present?

    return false if context == :create && Post.slugs.include?(slug)

    return false unless %w[authorized_only everyone nobody].include?(can_comment)

    true
  end

  def assign_attributes(*args)
    params = args.empty? ? {} : args[0]

    raise StandardError, 'Args empty' if params.keys.empty?

    self.slug = params['slug'] unless slug
    if params.include?('images_attachments_attributes')
      self.images_attachments_attributes = params['images_attachments_attributes']
    end
    params.each do |k, v|
      next if k == 'images_attachments_attributes'

      send("#{k}=", v)
    end

    self
  end

  def images=(*args)
    params = args.empty? ? [] : args[0]
    raise StandardError, 'Args empty' if params.empty?

    dir = "#{Settings.postsDir}/#{slug}"
    FileUtils.mkdir_p dir unless Dir.exist?(dir)
    params.each do |image|
      # TODO: copy file with cp
      image_data = File.open(image.tempfile.path, 'r', &:read)
      File.open("#{dir}/#{image.original_filename}", 'w') do |f|
        f.write(image_data)
      end
    end
  end

  def tag_ids=(*args)
    # Rails use this method for nested CRUD
    # We don't use accepts_nested_attributes_for for tags, so this method is unused
  end

  def tags_attributes=(*args)
    params = args.empty? ? [] : args[0]
    raise StandardError, 'Args empty' if params.empty?

    params.each do |tag|
      if tag.include?('id')
        if tag['_destroy'] == 'true'
          PostsTag.where(tag_id: tag['id'], post_slug: slug).destroy_all
          Tag.find(tag['id']).destroy! unless PostsTag.where(tag_id: tag['id']).exists?
        else
          unless PostsTag.where(tag_id: tag['id'], post_slug: slug).exists?
            PostsTag.create!(tag_id: tag['id'], post_slug: slug)
          end
        end
      else
        PostsTag.create!(tag: Tag.create!(text: tag['text']), post_slug: slug)
      end
    end
  end

  def save!
    dir = "#{Settings.postsDir}/#{slug}"
    FileUtils.mkdir_p dir unless Dir.exist?(dir)

    @created_at = DateTime.now if created_at.nil?
    @updated_at = DateTime.now
    manifest = {
      title: title,
      published: published,
      can_comment: can_comment,
      add_likes_auth_only: add_likes_auth_only,
      num_of_likes: num_of_likes,
      num_of_reposts: num_of_reposts,
      num_of_views: num_of_views,
      seo_title: seo_title,
      seo_kw: seo_kw,
      created_at: created_at,
      updated_at: updated_at
    }
    File.open("#{dir}/manifest.json", 'w') do |f|
      f.write(manifest.to_json)
    end

    File.open("#{dir}/#{published ? '' : 'draft_'}index.md", 'w') do |f|
      f.write(content)
    end

    push_to_git

    self
  end

  def self.create!(*args)
    post = Post.new(*args)
    raise StandardError, 'Post not valid' unless post.valid?

    post.save!
  end

  def destroy!
    FileUtils.rm_rf("#{Settings.postsDir}/#{slug}")
    PostsTag.where(post_slug: slug).each do |pt|
      pt.destroy!
      pt.tag.destroy! unless PostsTag.where(tag: pt.tag).exists?
    end
    push_to_git

    self
  end

  def push_to_git
    g = Git.open(Post.posts_dir, log: Logger.new(STDOUT))
    g.config('user.name', 'Root')
    g.config('user.email', User.first.email)
    g.add(all: true)
    g.commit("Update posts #{DateTime.now}")
    g.push(g.remote(Settings.remoteName))
  end

  def self.slugs
    dir = posts_dir
    Dir.open(dir) do |d|
      d.select do |o|
        !%w[. .. .git].include?(o) and File.directory?("#{dir}/#{o}")
      end
    end
  end

  def self.get_by_slug(slug)
    dir = "#{Settings.postsDir}/#{slug}"
    manifest = File.open("#{dir}/manifest.json", 'r') do |f|
      JSON.parse(f.read)
    end
    Post.new(
      manifest.symbolize_keys.merge(
        slug: slug,
        content: File.open("#{dir}/#{manifest['published'] ? '' : 'draft_'}index.md", 'r', &:read)
      )
    )
  end

  private

  def images_list
    dir = "#{Post.posts_dir}/#{slug}"
    Dir.open(dir) do |d|
      d.reject do |o|
        %w[. .. manifest.json index.md draft_index.md].include?(o) or File.directory?("#{dir}/#{o}")
      end
    end
  end
end
