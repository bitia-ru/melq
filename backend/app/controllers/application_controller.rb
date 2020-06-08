class ApplicationController < ActionController::Base
  include Resourceable
  include Authentication
  include Pundit
  protect_from_forgery

  respond_to :html, :json

  skip_before_action :verify_authenticity_token

  before_action { response.headers['Vary'] = 'Accept' }

  before_action :set_raven_context

  rescue_from Exception do |exception|
    @exception = exception

    puts "#{exception.class}: #{exception.message}"
    puts exception.backtrace
    ::Raven.capture_exception(exception) if defined?(::Raven) and ENV['SENTRY_DSN'].present?

    render 'api/v1/errors/internal_server_error', status: :internal_server_error
  end

  rescue_from 'ActiveRecord::RecordInvalid' do |exception|
    @exception = exception

    puts "#{exception.class}: #{exception.message}"
    puts exception.backtrace
    render 'api/v1/errors/bad_request', status: :bad_request
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    @exception = exception

    render 'api/v1/errors/not_found', status: :not_found
  end

  rescue_from Pundit::NotAuthorizedError do |exception|
    @exception = exception

    render 'api/v1/errors/not_authorized', status: :not_found
  end

  def alive
    render json: true
  end

  private

  def set_raven_context
    Raven.user_context(id: session[:current_user_id]) # or anything else in session
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end
end
