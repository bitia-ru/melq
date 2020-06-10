require 'net/http'
require 'open-uri'

module Api
  module V1
    class UsersController < BaseController
      include Purable

      before_action(
        :authenticate_user!,
        only: %i[update]
      )

      before_action(
        :try_to_authenticate_user!,
        only: :show
      )

      def show
        if current_user.nil?
          cookies.delete(:user_session_token, domain: request.domain)
          render 'api/v1/errors/unauthorized', status: :unauthorized
          return
        end
        @current_user = current_user
        if params[:id] == 'self'
          # Raise error if current_user nil
          User.find('self') if current_user.nil?

          instance_variable_set("@#{resource_name}", current_user)
        else
          instance_variable_set("@#{resource_name}", User.find(params[:id]))
        end
        respond_with(metadata: @metadata, payload: resource)
      end

      def update
        authorize resource
        @current_user = resource
        resource.avatar.purge if resource.avatar.attached? && params.dig(:user, :avatar) == 'null'
        current_params = user_params
        if (current_params.to_hash.length == 1) && current_params.dig(:avatar) == 'null'
          instance_variable_set("@#{resource_name}", resource)
        else
          super
        end
      end

      private

      def prepare_params
        prepared_params = params.dup
        if prepared_params.include? :user
          prepared_params[:user].each do |k, v|
            next unless %w[login email name].include? k

            next unless v == ''

            prepared_params[:user][k] = nil
          end
        end
        prepared_params
      end

      def user_params
        prepared_params = prepare_params
        if prepared_params.dig(:user, :avatar) == 'null'
          prepared_params.require(:user).except(%i[avatar]).permit!
        else
          prepared_params.permit![:user]
        end
      end
    end
  end
end
