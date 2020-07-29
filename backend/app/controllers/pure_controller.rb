class PureController < ActionController::Base
  include Authentication
  include Pundit
  include CommonController
  include ErrorHandlers
  include Bitia::Purable

  private

  def authorize_resource!
    resources.each(&method(:authorize)) if resources.present?
    authorize resource if resource.present?
  end
end
