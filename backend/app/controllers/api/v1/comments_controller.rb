module Api
  module V1
    class CommentsController < BaseController
      include Purable

      private

      def comment_params
        params.permit![:comment]
      end
    end
  end
end
