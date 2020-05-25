module Authentication
  extend ActiveSupport::Concern

  def authenticate_user!
    request.env['warden'].authenticate!
  end

  def try_to_authenticate_user!
    request.env['warden'].authenticate(:token)
  end

  def current_user
    request.env['warden'].user
  end

  def user_signed_in?
    !request.env['warden'].user.nil?
  end
end
