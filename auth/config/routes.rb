Rails.application.routes.draw do
  scope '/auth' do
    root 'application#check'
  end

  scope '/api', module: :api, defaults: { format: :json } do
    scope '/v1', module: :v1 do
      get '/user_sessions/new', to: 'user_sessions#new'
      post '/user_sessions', to: 'user_sessions#create'
      patch '/user_sessions/actions/log_out', to: 'user_sessions#log_out'
      resources :user_sessions
    end
  end
end
