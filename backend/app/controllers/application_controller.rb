class ApplicationController < ActionController::Base
  include Authentication
  include Pundit
  include CommonController

  def alive
    render json: true
  end
end
