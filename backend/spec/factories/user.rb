FactoryBot.define do
  factory :user do
    email { 'email@email.ru' }
    password_digest { BCrypt::Password.create('123456') }
  end
end
