require 'rails_helper'
require 'fakefs/spec_helpers'

RSpec.describe Post, type: :model do
  include FakeFS::SpecHelpers

  let(:dir_name) { 'posts_dir' }
  before do
    allow_any_instance_of(Config::Options)
      .to receive(:method_missing).with(:postsDir).and_return(dir_name)
  end
  before { FakeFS.activate! }
  after { FakeFS.deactivate! }
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
  let(:post_data) { manifest.merge!({ content: 'Post content' }) }
  let(:slugs) { %w[slug1 slug2 slug3] }
  let(:slug) { slugs.first }
  let(:post) { described_class.new(post_data.merge!(slug: slug)) }
  let(:images) { %w[image1 image2 image3] }
  let!(:user) { create(:user) }

  describe '#posts_dir' do
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
    context "when post doesn't exist" do
      it 'should return nil' do
        expect(described_class.get_by_slug("wrong_#{slug}")).to be_nil
      end
    end

    context 'when post exists' do
      before do
        FileUtils.mkdir_p("#{dir_name}/#{slug}")
        File.open("#{dir_name}/#{slug}/manifest.json", 'w') do |f|
          f.write(manifest.merge!({ published: published }).to_json)
        end
      end

      context 'and post is published' do
        let(:published) { true }
        before do
          File.open("#{dir_name}/#{slug}/index.md", 'w') do |f|
            f.write(post.content)
          end
        end

        it 'should return post' do
          expect(described_class.get_by_slug(slug)).to be_instance_of(described_class)
        end

        it 'should have right title' do
          expect(described_class.get_by_slug(slug).title).to eq(manifest[:title])
        end

        it 'should load content from index.md' do
          expect(described_class.get_by_slug(slug).content).to eq(post.content)
        end
      end

      context "and post isn't published" do
        let(:published) { false }
        let(:draft_content) { "Draft #{post.content}" }
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
  end

  describe '#new' do
    it 'should return post' do
      expect(described_class.new).to be_instance_of(described_class)
    end

    it 'should have right title' do
      expect(described_class.new(title: post_data[:title]).title).to eq(post_data[:title])
    end

    it 'should have published false' do
      expect(described_class.new(title: post_data[:title]).published).to be false
    end
  end

  describe '#slugs' do
    before do
      slugs.each { |slug| FileUtils.mkdir_p("#{dir_name}/#{slug}") }
    end

    it 'should return slugs' do
      expect(described_class.slugs).to match_array slugs
    end
  end

  describe '#images_list' do
    before do
      FileUtils.mkdir_p("#{dir_name}/#{slug}")
      images.each { |image| File.open("#{dir_name}/#{slug}/#{image}", 'w') }
    end

    it 'should return images' do
      expect(described_class.new(slug: slug).send(:images_list)).to match_array images
    end
  end

  describe '#push_to_git' do
    before { FakeFS.deactivate! }
    after { FakeFS.activate! }
    Dir.mktmpdir do |dir|
      let(:filename) { 'filename' }
      let(:git_ref_dir) { 'git_ref_dir' }
      let(:dir_copy_name) { 'posts_dir_copy' }
      before do
        allow_any_instance_of(Config::Options)
          .to receive(:method_missing).with(:postsDir).and_return("#{dir}/#{dir_name}")
        allow_any_instance_of(Config::Options)
          .to receive(:method_missing).with(:remoteName).and_return('origin')
        FileUtils.mkdir_p("#{dir}/#{git_ref_dir}")
        # TODO: Find out why this fails
        # Git.init("#{dir}/#{git_ref_dir}", { bare: true })
        `git init --bare #{dir}/#{git_ref_dir}`
        Git.clone("#{dir}/#{git_ref_dir}", "#{dir}/#{dir_name}")
        File.open("#{dir}/#{dir_name}/#{filename}", 'w')
        post.push_to_git
        Git.clone("#{dir}/#{git_ref_dir}", "#{dir}/#{dir_copy_name}")
      end

      it 'should push to git repository' do
        expect(File.exist?("#{dir}/#{dir_copy_name}/#{filename}")).to be true
      end
    end
  end

  describe '#save!' do
    let(:new_post) { described_class.new(slug: slug, published: published) }
    before do
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

  describe '#find_by' do
    it 'should raise error if no arguments passed' do
      expect { described_class.find_by }.to raise_error(ArgumentError)
    end

    it "shouldn't raise error when only slug passed" do
      expect { described_class.find_by(slug: slug) }.not_to raise_error
    end

    context 'when post exists' do
      before do
        allow(described_class)
          .to receive(:get_by_slug).with(slug).and_return(described_class.new(slug: slug))
      end

      it 'should return post' do
        expect(described_class.get_by_slug(slug)).to be_instance_of(described_class)
      end

      it 'should return post with right slug' do
        expect(described_class.get_by_slug(slug).slug).to eq slug
      end
    end
  end

  describe '#images_attachments_attributes=' do
    it 'should raise error if no arguments passed' do
      expect { post.images_attachments_attributes = [] }.to raise_error(ArgumentError)
    end

    context 'when arguments passed' do
      let(:updated_image) { 'updated_image' }
      before do
        FileUtils.mkdir_p("#{dir_name}/#{slug}")
        images.each { |image| File.open("#{dir_name}/#{slug}/#{image}", 'w') }
        post.images_attachments_attributes = [
          { id: 1, filename: updated_image }.stringify_keys,
          { id: 2, _destroy: 'true' }.stringify_keys
        ]
      end

      it 'should update images' do
        expect(post.send(:images_list)).to match_array [images.first, updated_image]
      end
    end
  end

  describe '#valid?' do
    it 'should return false when slug not present' do
      expect(described_class.new.valid?).to eq false
    end

    context 'when slug is already used' do
      before do
        allow_any_instance_of(described_class).to receive(:push_to_git).and_return(true)
        described_class.new(slug: slug).save!
      end

      it 'should return false' do
        expect(described_class.new(slug: slug).valid?).to eq false
      end
    end

    it 'should return false when can_comment is invalid' do
      expect(described_class.new(slug: slug, can_comment: 'invalid_value').valid?).to eq false
    end

    it 'should return true when all args are valid' do
      expect(described_class.new(slug: slug).valid?).to eq true
    end
  end

  describe '#assign_attributes' do
    it 'should raise error if no arguments passed' do
      expect { post.assign_attributes }.to raise_error(ArgumentError)
    end

    it "shouldn't change slug if it's already set" do
      expect(post.assign_attributes('slug' => 'updated_slug').slug).to eq slug
    end

    it 'should assign right values' do
      expect(post.assign_attributes(title: 'updated_title').title).to eq 'updated_title'
      expect(post.assign_attributes(content: 'updated_content').content).to eq 'updated_content'
      expect(post.assign_attributes(published: true).published).to eq true
    end
  end

  describe '#images=' do
    it 'should raise error if no arguments passed' do
      expect { post.images = [] }.to raise_error(ArgumentError)
    end

    context 'when arguments passed' do
      let(:filename) { 'filename' }
      before do
        File.open('tempfile', 'w')
        post.images = [
          ActionDispatch::Http::UploadedFile.new(
            {
              tempfile: File.open('tempfile', 'r'),
              filename: filename
            }
          )
        ]
      end

      it 'should add image file to post dir' do
        expect(File.exist?("#{dir_name}/#{slug}/#{filename}")).to eq true
      end
    end
  end

  describe '#tags_attributes=' do
    it 'should raise error if no arguments passed' do
      expect { post.tags_attributes = [] }.to raise_error(ArgumentError)
    end

    context 'when arguments passed' do
      let(:tag) { 'tag' }
      before do
        allow_any_instance_of(Tag).to receive(:notify_about_changes_to_channel).and_return(true)
        post.tags_attributes = [
          { text: tag }.stringify_keys
        ]
      end

      context 'but no id passed' do
        it 'should create tag' do
          expect(post.tags.last.text).to eq tag
        end
      end

      context 'id passed and _destroy flag passed' do
        let(:tag_id) { post.tags.last.id }
        before do
          post.tags_attributes = [
            { id: tag_id, _destroy: 'true' }.stringify_keys
          ]
        end

        it 'should update tag' do
          expect(post.tags.map(&:id)).not_to include tag_id
        end
      end
    end
  end

  describe '#destroy!' do
    before do
      allow_any_instance_of(described_class).to receive(:push_to_git).and_return(true)
      post.save!
      post.destroy!
    end

    it 'should destroy post' do
      expect(described_class.get_by_slug(slug)).to be_nil
    end
  end
end
