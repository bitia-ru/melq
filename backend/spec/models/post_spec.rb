require 'rails_helper'

RSpec.describe Post, type: :model do
  let(:manifest) do
    {
      title: 'Post title',
      published: false,
      can_comment: 'authorized_only',
      add_likes_auth_only: false,
      num_of_likes: 57,
      num_of_reposts: 57,
      num_of_views: 57,
      seo_title: 'SEO title',
      seo_kw: %w[kw1 kw2],
      created_at: DateTime.now,
      updated_at: DateTime.now
    }
  end
  let(:post) { manifest.merge!({ content: 'Post content' }) }
  let(:slugs) { ['slug1', 'slug2', 'slug3'] }
  let(:slug) { slugs.first }

  describe '#posts_dir' do
    let(:dir_name) { 'foo' }

    before do
      allow_any_instance_of(Config::Options)
        .to receive(:method_missing).with(:postsDir).and_return(dir_name)
      allow(FileUtils).to receive(:mkdir_p).with(dir_name).and_return(true)
    end

    context 'when dir exists' do
      before do
        allow(Dir).to receive(:exist?).with(dir_name).and_return(true)
      end

      it 'should return dir name' do
        expect(described_class.posts_dir).to eq dir_name
      end

      it "shouldn't try to create dir" do
        described_class.posts_dir
        expect(FileUtils)
          .not_to have_received(:mkdir_p)
      end
    end

    context "when dir doesn't exist" do
      before do
        allow(Dir).to receive(:exist?).with(dir_name).and_return(false)
      end

      it 'should return dir name' do
        expect(described_class.posts_dir).to eq dir_name
      end

      it 'should create dir' do
        described_class.posts_dir
        expect(FileUtils)
          .to have_received(:mkdir_p).with(dir_name).once
      end
    end
  end

  describe '#all' do
    before do
      allow(described_class).to receive(:slugs).and_return(slugs)
      slugs.each do |slug|
        allow(described_class)
          .to receive(:get_by_slug).with(slug).and_return(described_class.new(slug: slug))
      end
    end

    it 'should return array of posts' do
      expect(described_class.all)
        .to all(be_an(described_class))
    end

    it 'should return array of posts with right slugs' do
      expect(described_class.all.map(&:slug).sort)
        .to eq(slugs)
    end
  end

  describe '#get_by_slug' do
    Dir.mktmpdir do |dir|
      before do
        allow_any_instance_of(Config::Options)
          .to receive(:method_missing).with(:postsDir).and_return(dir)
        FileUtils.mkdir_p("#{dir}/#{slug}")
        File.open("#{dir}/#{slug}/manifest.json", 'w') do |f|
          f.write(manifest.merge!({ published: published }).to_json)
        end
      end

      context 'when post is published' do
        let(:published) { true }
        before do
          File.open("#{dir}/#{slug}/index.md", 'w') do |f|
            f.write(post[:content])
          end
        end

        it 'should return post' do
          expect(described_class.get_by_slug(slug)).to be_instance_of(Post)
        end

        it 'should have right title' do
          expect(described_class.get_by_slug(slug).title).to eq(manifest[:title])
        end

        it 'should load content from index.md' do
          expect(described_class.get_by_slug(slug).content).to eq(post[:content])
        end
      end

      context "when post isn't published" do
        let(:published) { false }
        let(:draft_content) { "Draft #{post[:content]}" }
        before do
          File.open("#{dir}/#{slug}/draft_index.md", 'w') do |f|
            f.write(draft_content)
          end
        end

        it 'should return post' do
          expect(described_class.get_by_slug(slug)).to be_instance_of(Post)
        end

        it 'should have right title' do
          expect(described_class.get_by_slug(slug).title).to eq(manifest[:title])
        end

        it 'should load content from draft_index.md' do
          expect(described_class.get_by_slug(slug).content).to eq(draft_content)
        end
      end
    end
  end

  describe '#new' do
    it 'should return post' do
      expect(described_class.new()).to be_instance_of(Post)
    end

    it 'should have right title' do
      expect(described_class.new(title: post[:title]).title).to eq(post[:title])
    end

    it 'should have published false' do
      expect(described_class.new(title: post[:title]).published).to be false
    end
  end

  describe '#slugs' do
    Dir.mktmpdir do |dir|
      before do
        allow_any_instance_of(Config::Options)
          .to receive(:method_missing).with(:postsDir).and_return(dir)
        slugs.each { |slug| FileUtils.mkdir_p("#{dir}/#{slug}") }
      end

      it 'should return slugs' do
        expect(described_class.slugs.sort).to eq slugs
      end
    end
  end

  describe '#images_list' do
    let(:images) { %w[image1 image2 image3] }
    Dir.mktmpdir do |dir|
      before do
        allow_any_instance_of(Config::Options)
          .to receive(:method_missing).with(:postsDir).and_return(dir)
        FileUtils.mkdir_p("#{dir}/#{slug}")
        images.each { |image| File.open("#{dir}/#{slug}/#{image}", 'w') }
      end

      it 'should return images' do
        expect(described_class.new(slug: slug).send(:images_list).sort).to eq images
      end
    end
  end

  describe '#push_to_git' do
    # TODO: test push_to_git
  end

  describe '#save!' do
    let(:new_post) { described_class.new(slug: slug, published: published) }
    Dir.mktmpdir do |dir|
      before do
        allow_any_instance_of(Config::Options)
          .to receive(:method_missing).with(:postsDir).and_return(dir)
        allow_any_instance_of(described_class).to receive(:push_to_git).and_return(true)
        new_post.save!
      end

      context 'when post is published' do
        let(:published) { true }

        it 'should create manifest.json' do
          expect(File.exist?("#{dir}/#{slug}/manifest.json")).to be true
        end

        it 'should create index.md' do
          expect(File.exist?("#{dir}/#{slug}/index.md")).to be true
        end

        it 'should set created_at to not nil value' do
          expect(Post.get_by_slug(slug).created_at).not_to be_nil
        end

        it 'should push to git' do
          expect(new_post)
            .to have_received(:push_to_git).once
        end
      end

      context "when post isn't published" do
        let(:published) { false }

        it 'should create manifest.json' do
          expect(File.exist?("#{dir}/#{slug}/manifest.json")).to be true
        end

        it 'should create draft_index.md' do
          expect(File.exist?("#{dir}/#{slug}/draft_index.md")).to be true
        end

        it 'should set created_at to not nil value' do
          expect(Post.get_by_slug(slug).created_at).not_to be_nil
        end

        it 'should push to git' do
          expect(new_post)
            .to have_received(:push_to_git).once
        end
      end
    end
  end
end
