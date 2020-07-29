module CommonController
  extend ActiveSupport::Concern

  included do
    protect_from_forgery

    respond_to :html, :json

    skip_before_action :verify_authenticity_token

    before_action { response.headers['Vary'] = 'Accept' }
  end
end
