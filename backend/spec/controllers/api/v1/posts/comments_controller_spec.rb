# frozen_string_literal: true

require 'rails_helper'
require 'fakefs/spec_helpers'

RSpec.describe Api::V1::Posts::CommentsController, type: :controller do
  include ControllersHelpers
  include UserHelpers
  include FakeFS::SpecHelpers
  render_views

  let(:dir_name) { 'posts_dir' }
  before do
    request.accept = 'application/json'
    allow_any_instance_of(Config::Options)
      .to receive(:method_missing).with(:postsDir).and_return(dir_name)
    allow_any_instance_of(Comment)
      .to receive(:notify_about_create_update_to_channel).and_return(true)
    allow_any_instance_of(Comment)
      .to receive(:notify_about_destroy_to_channel).and_return(true)
  end
  before { FakeFS.activate! }
  after { FakeFS.deactivate! }
  let!(:user) { create(:user) }
  NUM_OF_COMMENTS = 3
  NUM_OF_HIDDEN_COMMENTS = 2

  describe ':index' do
    let(:slug) { 'slug' }
    (1..NUM_OF_COMMENTS).each do |i|
      let!("comment#{i}".to_sym) { create(:comment, slug: slug, content: "Comment content#{i}") }
    end
    (1..NUM_OF_HIDDEN_COMMENTS).each do |i|
      let!("comment#{i + NUM_OF_COMMENTS}".to_sym) do
        create(:comment, slug: slug, content: "Hidden comment content#{i}", hidden: true)
      end
    end
    comments_content = (1..NUM_OF_COMMENTS).map { |i| "Comment content#{i}" }
    hidden_comments_content = (1..NUM_OF_HIDDEN_COMMENTS).map { |i| "Hidden comment content#{i}" }

    before do
      clone_views
      allow_any_instance_of(Post).to receive(:push_to_git).and_return(true)
      allow_any_instance_of(Authentication).to receive(:try_to_authenticate_user!).and_return(true)
      Post.create!(slug: slug)
    end

    context "when user isn't signed in" do
      before do
        stub_user_not_authenticated
        get :index, params: { post_slug: slug }
      end

      it 'should success' do
        expect(response).to have_http_status(:success)
      end

      it 'should contain metadata with key all equals number of not hidden comments' do
        expect(parsed_response_body.dig('metadata', 'all'))
          .to eq NUM_OF_COMMENTS + NUM_OF_HIDDEN_COMMENTS
      end

      it 'should contain entities with key comments and value type array' do
        expect(parsed_response_body.dig('entities', 'comments')).to be_instance_of(Array)
      end

      it 'should contain entities with key comments and value array of not hidden comments' do
        expect(
          parsed_response_body
            .dig('entities', 'comments')
            .map { |comment| comment['content'] }
        ).to match_array comments_content
      end
    end

    context 'when user is signed in' do
      before do
        stub_user_authenticated(user)
        get :index, params: { post_slug: slug }
      end

      it 'should success' do
        expect(response).to have_http_status(:success)
      end

      it 'should contain metadata with key all equals number of all comments' do
        expect(parsed_response_body.dig('metadata', 'all'))
          .to eq NUM_OF_COMMENTS + NUM_OF_HIDDEN_COMMENTS
      end

      it 'should contain entities with key comments and value type array' do
        expect(parsed_response_body.dig('entities', 'comments')).to be_instance_of(Array)
      end

      it 'should contain entities with key comments and value array of all comments' do
        expect(
          parsed_response_body
            .dig('entities', 'comments')
            .map { |comment| comment['content'] }
        ).to match_array comments_content + hidden_comments_content
      end
    end
  end
end
