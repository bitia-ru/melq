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

      def update
        if params.dig(:post, :images_attachments_attributes)
          params.dig(:post, :images_attachments_attributes).each do |attachment|
            next unless (%i[id filename] - attachment.keys).empty?
            blob = post.images.find_by(blob_id: attachment[:id]).blob
            blob.filename = attachment[:filename]
            blob.save!
          end
        end
        super
      end

      private

      def post_params
        params.permit![:post]
      end
    end
  end
end
