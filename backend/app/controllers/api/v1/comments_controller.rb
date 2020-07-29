module Api
  module V1
    class CommentsController < BaseController
      before_action(
        :try_to_authenticate_user!,
        only: :create
      )

      def create
        @comment.user_id = user_signed_in? ? current_user.id : nil
        super
      end

      private

      def comment_params
        params.permit![:comment]
      end
    end
  end
end
