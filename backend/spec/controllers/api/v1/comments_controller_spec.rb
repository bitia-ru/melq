# frozen_string_literal: true

require 'rails_helper'
require 'fakefs/spec_helpers'

RSpec.describe Api::V1::CommentsController, type: :controller do
  include ControllersHelpers
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

  describe ':create' do
    let(:slug) { 'slug' }

    before do
      # TODO: Change to right route, after switch to bitia-rails gem
      FakeFS::FileSystem.clone('./bitia-rails/app/views')
      FakeFS::FileSystem.clone('./app/views')
      allow_any_instance_of(Post).to receive(:push_to_git).and_return(true)
      allow_any_instance_of(Authentication).to receive(:try_to_authenticate_user!).and_return(true)
      Post.create!(slug: slug)
    end

    context "when user isn't signed in" do
      before do
        allow_any_instance_of(Authentication).to receive(:user_signed_in?).and_return(false)
        allow_any_instance_of(Authentication).to receive(:current_user).and_return(nil)
        post :create, params: { post_slug: slug, comment: { content: 'content' } }
      end

      it 'should success' do
        expect(response).to have_http_status(:success)
      end

      it 'should set user_id to nil' do
        expect(parsed_response_body.dig('entities', 'comment', 'user_id'))
          .to be_nil
      end
    end

    context 'when user is signed in' do
      before do
        allow_any_instance_of(Authentication).to receive(:user_signed_in?).and_return(true)
        allow_any_instance_of(Authentication).to receive(:current_user).and_return(user)
        get :create, params: { post_slug: slug, comment: { content: 'content' } }
      end

      it 'should success' do
        expect(response).to have_http_status(:success)
      end

      it 'should set user_id to current_user id' do
        expect(parsed_response_body.dig('entities', 'comment', 'user_id'))
          .to eq user.id
      end
    end
  end
end
