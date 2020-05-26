module Api
  module V1
    class TagsController < BaseController
      include Purable

      private

      def tag_params
        params.permit![:tag]
      end
    end
  end
end
