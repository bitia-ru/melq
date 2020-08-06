# frozen_string_literal: true

require 'rails_helper'
require 'fakefs/spec_helpers'

RSpec.describe Api::V1::PostsController, type: :controller do
  include FakeFS::SpecHelpers

  let(:dir_name) { 'posts_dir' }
  before do
    request.accept = 'application/json'
    allow(Rails).to receive(:root).and_return('.')
    allow_any_instance_of(Config::Options)
      .to receive(:method_missing).with(:postsDir).and_return(dir_name)
  end
  before { FakeFS.activate! }
  after { FakeFS.deactivate! }

  describe ':image' do
    let(:slug) { 'slug' }
    let(:filename) { 'filename' }
    let(:content) { 'content' }

    before do
      allow_any_instance_of(Post).to receive(:push_to_git).and_return(true)
      post = Post.create!(slug: slug)
      File.open('tempfile', 'w') { |f| f.write(content) }
      post.images = [
        ActionDispatch::Http::UploadedFile.new(
          {
            tempfile: File.open('tempfile', 'r'),
            filename: filename
          }
        )
      ]
      get :image, params: { slug: slug, filename: filename }
    end

    it 'should success' do
      expect(response).to have_http_status(:success)
    end

    it 'should return image file content' do
      expect(response.body).to eq content
    end
  end
end
