require 'open-uri'

class ApplicationController < ActionController::Base
  include Resourceable
  include Authentication

  respond_to :json

  skip_before_action :verify_authenticity_token

  before_action { response.headers['Vary'] = 'Accept' }

  #before_action :set_raven_context

  rescue_from Exception do |exception|
    @exception = exception

    puts "#{exception.class}: #{exception.message}"
    puts exception.backtrace
    ::Raven.capture_exception(exception) if defined?(::Raven) and ENV['SENTRY_DSN'].present?

    render 'errors/internal_server_error', status: :internal_server_error
  end

  rescue_from 'ActiveRecord::RecordInvalid',
              'AASM::InvalidTransition',
              'ActiveRecord::SerializationTypeMismatch' do |exception|
    @exception = exception

    render 'errors/bad_request', status: :bad_request
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    @exception = exception

    render 'errors/not_found', status: :not_found
  end

  def alive
    render json: true
  end

  def check
    puts 'CHECK'
    begin
      user = User.session(cookies[:user_session_token]).user
      head 200, {'X_USER_ID' => user.id}
    rescue
      head 200
    end
  end

 def ajax_response ex
    Rails.logger.error ex.to_s
    Rails.logger.error ex.backtrace

    raise ex
  end

  protected

  def service_action service, params
    respond_to do |format|
      format.json do
        service.call(params)

        render json: { result: true }
      end
    end
  end

  private

  def set_raven_context
    Raven.user_context(id: session[:current_user_id]) # or anything else in session
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end
end
