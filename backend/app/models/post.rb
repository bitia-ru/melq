class Post
  attr_accessor :title,
                :content,
                :published,
                :can_comment,
                :add_likes_auth_only,
                :num_of_likes,
                :num_of_reposts,
                :num_of_views,
                :slug,
                :seo_title,
                :seo_kw
  attr_reader :created_at,
              :updated_at

  def initialize(*args)
    post = args.empty? ? {} : args[0]
    @title = post[:title]
    @content = post[:content]
    @published = post[:published] || false
    @can_comment = post[:can_comment] || 'authorized_only'
    @add_likes_auth_only = post[:add_likes_auth_only] || false
    @num_of_likes = post[:num_of_likes] || 0
    @num_of_reposts = post[:num_of_reposts] || 0
    @num_of_views = post[:num_of_views] || 0
    @slug = post[:slug]
    @seo_title = post[:seo_title]
    @seo_kw = post[:seo_kw] || []
    @created_at = nil
    @updated_at = nil
  end

  def self.postsDir
    FileUtils.mkdir_p Settings.postsDir unless Dir.exist?(Settings.postsDir)

    Settings.postsDir
  end

  def self.all
    self.slugs.map do |slug|
      Post.get_by_slug(slug)
    end
  end

  def self.find_by(*args)
    params = args.empty? ? {} : args[0]

    raise Exception.new('Args empty') if params.keys.empty?

    if params.keys.length > 1 || params.keys[0] != :slug
      raise Exception.new('Not Implemented')
    end

    slug = params.values[0]

    Post.get_by_slug(slug)
  end

  def attributes
    self.as_json
  end

  def tags
    PostsTag.where(slug: self.slug).map{|pt| pt.tag}
  end

  def images
    []
  end

  def comments
    Comment.where(slug: self.slug)
  end

  def valid?(context = :create)
    return false unless self.slug.present?

    return false if context == :create && Post.slugs.include?(self.slug)

    return false unless %w[authorized_only everyone nobody].include?(self.can_comment)

    true
  end

  def assign_attributes(*args)
    params = args.empty? ? {} : args[0]

    raise Exception.new('Args empty') if params.keys.empty?

    params.each do |k,v|
      self.send("#{k}=", v)
    end

    self
  end

  def tag_ids=(*args)
    # Rails use this method for nested CRUD
  end

  def tags_attributes=(*args)
    params = args.empty? ? [] : args[0]

    raise Exception.new('Args empty') if params.empty?

    params.each do |tag|
      if tag.include?('id')
        if tag.include?('_destroy') && tag['_destroy']
          PostsTag.where(tag_id: tag['id'], slug: self.slug).destroy_all
          unless PostsTag.where(tag_id: tag['id']).exists?
            Tag.find(tag['id']).destroy!
          end
        else
          unless PostsTag.where(tag_id: tag['id'], slug: self.slug).exists?
            PostsTag.create!(tag_id: tag['id'], slug: self.slug)
          end
        end
      else
        t = Tag.create!(text: tag['text'])
        PostsTag.create!(tag: t, slug: self.slug)
      end
    end
  end

  def save!
    dir = "#{Settings.postsDir}/#{self.slug}"
    FileUtils.mkdir_p dir unless Dir.exist?(dir)

    @created_at = DateTime.now if self.created_at.nil?
    @updated_at = DateTime.now
    manifest = {
        title: self.title,
        published: self.published,
        can_comment: self.can_comment,
        add_likes_auth_only: self.add_likes_auth_only,
        num_of_likes: self.num_of_likes,
        num_of_reposts: self.num_of_reposts,
        num_of_views: self.num_of_views,
        seo_title: self.seo_title,
        seo_kw: self.seo_kw,
        created_at: self.created_at,
        updated_at: self.updated_at,
    }
    File.open("#{dir}/manifest.json",'w') do |f|
      f.write(manifest.to_json)
    end

    File.open("#{dir}/#{self.published ? '' : 'draft_'}index.md",'w') do |f|
      f.write(self.content)
    end

    self
  end

  def self.create!(*args)
    post = Post.new(*args)
    raise Exception.new('Post not valid') unless post.valid?

    post.save!
  end

  private

  def self.slugs
    dir = postsDir
    Dir.open(dir) do |d|
      d.select do |o|
        !(%w[. ..].include?(o)) && File.directory?("#{dir}/#{o}")
      end
    end
  end

  def self.get_by_slug(slug)
    dir = "#{Settings.postsDir}/#{slug}"
    manifest = File.open("#{dir}/manifest.json",'r') do |f|
      JSON.load(f.read)
    end
    post = Post.new(manifest.symbolize_keys)
    post.slug = slug
    post.content = File.open("#{dir}/#{post.published ? '' : 'draft_'}index.md",'r') do |f|
      f.read
    end

    post
  end
end
