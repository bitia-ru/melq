module Api
  module V1
    class PostsController < BaseController
      include Purable

      before_action only: %i[show update destroy] do
        @post = Post.find_by(slug: params[:slug])
      end

      def post
        resource
      end

      def resource_id_name
        :slug
      end

      private

      def post_params
        params.permit![:post]
      end
    end
  end
end
