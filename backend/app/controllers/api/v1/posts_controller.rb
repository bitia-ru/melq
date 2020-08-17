module Api
  module V1
    class PostsController < BaseController
      def image
        send_file(
          "#{Rails.root}/storage/posts/#{params[:slug]}/#{params[:filename]}",
          disposition: 'inline'
        )
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
