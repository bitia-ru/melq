module Api
  module V1
    class LikesController < BaseController
      private

      def like_params
        params.permit![:like]
      end
    end
  end
end
