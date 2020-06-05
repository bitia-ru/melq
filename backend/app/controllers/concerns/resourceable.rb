module Resourceable
  extend ActiveSupport::Concern

  included do
    helper_method :resource_name

    def resource_name
      @resource
    end

    helper_method :resources_name

    def resources_name
      @resource.to_s.pluralize.to_sym
    end

    helper_method :resource_id_name

    def resource_id_name
      :id
    end

    helper_method :resource

    def resource
      instance_variable_get(:"@#{resource_name}")
    end

    helper_method :resources

    def resources
      instance_variable_get(:"@#{resources_name}")
    end

    def self.controller_prefix
      @@controller_prefix ||= [] # rubocop:disable Style/ClassVars
    end

    def self.controller_prefix_push(prefix)
      controller_prefix.push(*prefix.to_s.split('/').map(&:to_sym))
    end

    def controller_prefix
      self.class.controller_prefix
    end
  end
end
