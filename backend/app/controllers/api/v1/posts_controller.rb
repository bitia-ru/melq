module Api
  module V1
    class PostsController < BaseController
      include Purable

      private

      def post_params
        params.permit![:post]
      end
    end
  end
end
