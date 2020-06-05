module Api
  module V1
    module Posts
      class CommentsController < BaseController
        include Purable

        before_action(
          :try_to_authenticate_user!,
          only: :index
        )

        before_action only: %i[index] do
          @comments = Post.find_by(slug: params[:post_slug]).comments
        end

        def index
          @current_user = current_user
          @metadata ||= {}
          @metadata[:all] = @comments.count
          @comments = @comments.where(hidden: false) unless user_signed_in?
          super
        end

        def self.purable_model
          Comment
        end
      end
    end
  end
end
