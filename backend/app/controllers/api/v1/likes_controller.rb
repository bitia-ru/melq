module Api
  module V1
    class LikesController < BaseController
      include Purable

      private

      def like_params
        params.permit![:like]
      end
    end
  end
end
