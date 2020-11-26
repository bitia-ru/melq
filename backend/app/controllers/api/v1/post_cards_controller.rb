module Api
  module V1
    class PostCardsController < BaseController
      include Purable

      private

      def post_card_params
        params.permit![:post_card]
      end
    end
  end
end
