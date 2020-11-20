module Api
  module V1
    class TagsController < BaseController
      include Purable

      private

      def tag_params
        if params.include? :tags
          params.permit![:tags]
        else
          params.permit![:tag]
        end
      end
    end
  end
end
