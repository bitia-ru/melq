if defined?(::Raven) and ENV['SENTRY_DSN'].present?
  Raven.configure do |config|
    config.dsn = ENV['SENTRY_DSN']
    config.release = ENV['EXPRTM_VERSION'] || '0.0.0'
  end

  ActiveSupport.on_load :application_controller do
    include Raven::Rails::ControllerMethods
    include Raven::Rails::ControllerTransaction

    Raven.safely_prepend(
      "StreamingReporter",
      from: Raven::Rails::Overrides,
      to: ActionController::Live
    )
  end

  module Rake
    class Task
      alias :orig_execute :execute

      def execute(args = nil)
        Raven.capture logger: 'rake', tags: { 'rake_task' => @name } do
          orig_execute(args)
        end
      end
    end
  end

  module Raven
    class Rails
      module ActiveJob
        def self.included(base)
          base.class_eval do
            rescue_from(Exception) do |exception|
              Raven.capture_exception(exception, :extra => { :active_job => self.class.name })
              raise exception
            end
          end
        end
      end
    end
  end
end
