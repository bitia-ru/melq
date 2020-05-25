module Api
  module V1
    class SettingsController < BaseController
      include Purable

      private

      def setting_params
        params.permit![:setting]
      end
    end
  end
end
