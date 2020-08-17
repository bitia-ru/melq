# frozen_string_literal: true

module UserHelpers
  def stub_user_not_authenticated
    allow_any_instance_of(Authentication).to receive(:user_signed_in?).and_return(false)
    allow_any_instance_of(Authentication).to receive(:current_user).and_return(nil)
  end

  def stub_user_authenticated(user)
    allow_any_instance_of(Authentication).to receive(:user_signed_in?).and_return(true)
    allow_any_instance_of(Authentication).to receive(:current_user).and_return(user)
  end
end
