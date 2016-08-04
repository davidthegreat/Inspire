Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'index#index'
  post '/do-it', to: 'index#watson'
  get '/do-it', to: 'index#watson'
end
