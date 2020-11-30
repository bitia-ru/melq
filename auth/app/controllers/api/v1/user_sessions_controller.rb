module Api
  module V1
    class UserSessionsController < BaseController
      include Purable

      before_action :authenticate_user!, except: %i[new create]

      def show
        if params[:id] == 'self'
          # Raise error if current_user nil
          UserSession.find('self') if current_user.nil?

          instance_variable_set("@#{resource_name}", current_user.user_sessions.last)
        else
          instance_variable_set("@#{resource_name}", UserSession.find(params[:id]))
        end
        purable_respond_with(status: :success)
      end

      def new
        if params[:user_session][:user].include? :email
          user = User.find_by!('LOWER(email) = ?', params[:user_session][:user][:email].downcase)
        end
        bcrypt_prefix = user.password_digest.split('$')[0..-2].join('$')
        salt = user.password_digest.split('$')[-1][0..21]
        render json: "#{bcrypt_prefix}$#{salt}".to_json
      end

      def create
        if params[:user_session][:user].include? :email
          user = User.find_by!('LOWER(email) = ?', params[:user_session][:user][:email].downcase)
        end
        if user.password_digest == params[:user_session][:user][:password_digest]
          life_time = if params.dig(:rememberMe)
                        Settings.userSession.token.lifeTimeLong
                      else
                        Settings.userSession.token.lifeTimeShort
                      end
          token = SecureRandom.hex(10)
          user_session = UserSession.create!(
              token: token,
              user: user,
              user_agent: request.headers['User-Agent'],
              user_ip: request.headers['X-Forwarded-For'],
              valid_until: DateTime.now + life_time,
          )
          cookies[:user_session_token] = {
              value: token,
              domain: request.domain,
              expires: life_time.days.from_now
          }.merge(request.protocol == "https://" ? {secure: true} : {same_site: :none})
          cookies[:user_id] = {
              value: user.id,
              domain: request.domain,
              expires: life_time.days.from_now
          }.merge(request.protocol == "https://" ? {secure: true} : {same_site: :none})
          instance_variable_set("@#{resource_name}", user_session)
        else
          UserSession.create!(
              token: nil,
              user: user,
              user_agent: request.headers['User-Agent'],
              user_ip: request.headers['X-Forwarded-For'],
              valid_until: nil,
              success: false,
          )
          user.errors.add(:password_digest, 'Неверный пароль')
          raise ActiveRecord::RecordInvalid, user
        end
      end

      def log_out
        token = if params.include? :token
                  params[:token]
                else
                  cookies[:user_session_token]
                end
        user_session = current_user.session(token)
        user_session.valid_until = DateTime.now
        user_session.save!
        instance_variable_set("@#{resource_name}", user_session)
        cookies.delete(:user_session_token, domain: request.domain)
        cookies.delete(:user_id, domain: request.domain)
      end

      private

      def user_session_params
        params.permit![:user_session]
      end
    end
  end
end
