Rails.application.routes.draw do
  resources :recipes, only: %i[index]
  root "recipes#index"
end
