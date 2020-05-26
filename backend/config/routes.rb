Rails.application.routes.draw do
  default_url_options only_path: true

  get '/alive', to: 'application#alive'
  scope '/api', module: :api, defaults: { format: :json } do
    scope '/v1', module: :v1 do

      resources :users

      get '/user_sessions/new', to: 'user_sessions#new'
      patch '/user_sessions/actions/log_out', to: 'user_sessions#log_out'
      resources :user_sessions
      resources :posts, param: :slug
      resources :tags
    end
  end
end
