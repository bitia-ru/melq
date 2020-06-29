additional_autoload_paths = Dir[File.join(Rails.root, 'lib', 'redis.rb')].sort.each do |l|
  require l
end
Rails.application.config.autoload_paths += additional_autoload_paths

Warden::Strategies.add(:user_id) do
  def valid?
    @headers = env.select { |k, _v| k.start_with? 'HTTP_' }
                  .collect { |key, val| [key.sub(/^HTTP_/, ''), val] }
                  .each_with_object({}) { |(key, val), a| a[key] = val }

    @headers.include? 'X_USER_ID'
  end

  def authenticate!
    @headers = env.select { |k, _v| k.start_with? 'HTTP_' }
                  .collect { |key, val| [key.sub(/^HTTP_/, ''), val] }
                  .each_with_object({}) { |(key, val), a| a[key] = val }
    @user_id = @headers['X_USER_ID']
    user = User.find(@user_id)
    success!(user)
  rescue StandardError
    fail!
  end
end

Rails.configuration.middleware.use Warden::Manager do |manager|
  manager.failure_app = ->(_env) { [401, {}, ['Unauthenticated']] }
  manager.default_strategies :user_id
end

module Melq
  class Authentication
    def store
      @store ||= Redis.new(Rails.application.config_for(:redis)) unless Rails.env == 'test'
    end
  end

  def self.authentication
    @authentication ||= Authentication.new
  end
end
