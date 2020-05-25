additional_autoload_paths = Dir[File.join(Rails.root, 'lib', 'redis.rb')].each do |l|
  require l
end
Rails.application.config.autoload_paths += additional_autoload_paths

Warden::Strategies.add(:token) do
  def valid?
    @headers = env.select { |k, _v| k.start_with? 'HTTP_' }
                   .collect { |key, val| [key.sub(/^HTTP_/, ''), val] }
                   .each_with_object({}) { |(key, val), a| a[key] = val }

    if @headers['COOKIE']
      @cookies = @headers['COOKIE'].split('; ').map{ |c| [c.split('=')[0], c.split('=')[1]] }
                     .each_with_object({}) { |(key, val), a| a[key] = val }
    end
    @cookies ||= {}

    params.include? 'token' or @headers.include? 'TOKEN' or @cookies.include? 'user_session_token'
  end

  def authenticate!
    @headers = env.select { |k, _v| k.start_with? 'HTTP_' }
                   .collect { |key, val| [key.sub(/^HTTP_/, ''), val] }
                   .each_with_object({}) { |(key, val), a| a[key] = val }

    @token = if params.include? 'token'
               params['token']
             elsif @headers.include? 'TOKEN'
               @headers['TOKEN']
             else
               @cookies['user_session_token']
             end
    user_session = UserSession.find_by!(token: @token)
    if user_session.valid_until > DateTime.now
      success!(user_session.user)
    else
      fail!
    end
  rescue StandardError
    fail!
  end
end

Rails.configuration.middleware.use Warden::Manager do |manager|
  manager.failure_app = ->(_env) { [401, {}, ['Unauthenticated']] }
  manager.default_strategies :token
end

module Gekkon
  class Authentication
    def store
      @store ||= Redis.new(Rails.application.config_for(:redis)) unless Rails.env == 'test'
    end
  end

  def self.authentication
    @authentication ||= Authentication.new
  end
end
