module Api
  module V1
    class BaseController < ::ApplicationController
      controller_prefix_push :'api/v1'
    end
  end
end
