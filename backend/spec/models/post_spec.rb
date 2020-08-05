require 'rails_helper'
require 'fakefs/spec_helpers'

RSpec.describe Post, type: :model do
  include FakeFS::SpecHelpers

  before { FakeFS.activate! }
  after { FakeFS.deactivate! }
  let(:dir_name) { 'posts_dir' }
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
  let(:slugs) { %w[slug1 slug2 slug3] }
  let(:slug) { slugs.first }

  describe '#posts_dir' do
    before do
      allow_any_instance_of(Config::Options)
        .to receive(:method_missing).with(:postsDir).and_return(dir_name)
    end

    context 'when dir exists' do
      before do
        FileUtils.mkdir_p(dir_name)
      end

      it 'should return dir name' do
        expect(described_class.posts_dir).to eq dir_name
      end
    end

    context "when dir doesn't exist" do
      it 'should return dir name' do
        expect(described_class.posts_dir).to eq dir_name
      end

      it 'should create dir' do
        described_class.posts_dir
        expect(Dir.exist?(dir_name)).to eq true
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
      expect(described_class.all.map(&:slug))
        .to match_array(slugs)
    end
  end

  describe '#get_by_slug' do
    before do
      allow_any_instance_of(Config::Options)
        .to receive(:method_missing).with(:postsDir).and_return(dir_name)
      FileUtils.mkdir_p("#{dir_name}/#{slug}")
      File.open("#{dir_name}/#{slug}/manifest.json", 'w') do |f|
        f.write(manifest.merge!({ published: published }).to_json)
      end
    end

    context 'when post is published' do
      let(:published) { true }
      before do
        File.open("#{dir_name}/#{slug}/index.md", 'w') do |f|
          f.write(post[:content])
        end
      end

      it 'should return post' do
        expect(described_class.get_by_slug(slug)).to be_instance_of(described_class)
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
        File.open("#{dir_name}/#{slug}/draft_index.md", 'w') do |f|
          f.write(draft_content)
        end
      end

      it 'should return post' do
        expect(described_class.get_by_slug(slug)).to be_instance_of(described_class)
      end

      it 'should have right title' do
        expect(described_class.get_by_slug(slug).title).to eq(manifest[:title])
      end

      it 'should load content from draft_index.md' do
        expect(described_class.get_by_slug(slug).content).to eq(draft_content)
      end
    end
  end

  describe '#new' do
    it 'should return post' do
      expect(described_class.new).to be_instance_of(described_class)
    end

    it 'should have right title' do
      expect(described_class.new(title: post[:title]).title).to eq(post[:title])
    end

    it 'should have published false' do
      expect(described_class.new(title: post[:title]).published).to be false
    end
  end

  describe '#slugs' do
    before do
      allow_any_instance_of(Config::Options)
        .to receive(:method_missing).with(:postsDir).and_return(dir_name)
      slugs.each { |slug| FileUtils.mkdir_p("#{dir_name}/#{slug}") }
    end

    it 'should return slugs' do
      expect(described_class.slugs).to match_array slugs
    end
  end

  describe '#images_list' do
    let(:images) { %w[image1 image2 image3] }
    before do
      allow_any_instance_of(Config::Options)
        .to receive(:method_missing).with(:postsDir).and_return(dir_name)
      FileUtils.mkdir_p("#{dir_name}/#{slug}")
      images.each { |image| File.open("#{dir_name}/#{slug}/#{image}", 'w') }
    end

    it 'should return images' do
      expect(described_class.new(slug: slug).send(:images_list)).to match_array images
    end
  end

  describe '#push_to_git' do
    # TODO: test push_to_git
  end

  describe '#save!' do
    let(:new_post) { described_class.new(slug: slug, published: published) }
    before do
      allow_any_instance_of(Config::Options)
        .to receive(:method_missing).with(:postsDir).and_return(dir_name)
      allow_any_instance_of(described_class).to receive(:push_to_git).and_return(true)
      new_post.save!
    end

    context 'when post is published' do
      let(:published) { true }

      it 'should create manifest.json' do
        expect(File.exist?("#{dir_name}/#{slug}/manifest.json")).to be true
      end

      it 'should create index.md' do
        expect(File.exist?("#{dir_name}/#{slug}/index.md")).to be true
      end

      it 'should set created_at to current time' do
        expect(described_class.get_by_slug(slug).created_at.to_time)
          .to be_within(1.minute).of Time.now
      end

      it 'should push to git' do
        expect(new_post)
          .to have_received(:push_to_git).once
      end
    end

    context "when post isn't published" do
      let(:published) { false }

      it 'should create manifest.json' do
        expect(File.exist?("#{dir_name}/#{slug}/manifest.json")).to be true
      end

      it 'should create draft_index.md' do
        expect(File.exist?("#{dir_name}/#{slug}/draft_index.md")).to be true
      end

      it 'should set created_at to not nil value' do
        expect(described_class.get_by_slug(slug).created_at).not_to be_nil
      end

      it 'should push to git' do
        expect(new_post)
          .to have_received(:push_to_git).once
      end
    end
  end
end
