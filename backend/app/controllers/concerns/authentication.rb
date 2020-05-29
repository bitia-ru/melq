module Authentication
  extend ActiveSupport::Concern

  def authenticate_user!
    request.env['warden'].authenticate!
  end

  def try_to_authenticate_user!
    request.env['warden'].authenticate(:user_id)
  end

  def current_user
    user_signed_in? ? User.find(request.env['warden'].user['id']) : nil
  end

  def user_signed_in?
    !request.env['warden'].user.nil?
  end
end
