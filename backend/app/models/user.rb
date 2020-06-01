class User < ApplicationRecord
  validates(
    :email,
    uniqueness: {
      message: 'Пользователь с таким email уже существует'
    }
  )
  validates_format_of(
    :email,
    with: /\A([^@\s]+)@((?:[-a-zA-Z0-9]+\.)+[a-zA-Z]{2,})\z/i,
    message: 'Неверный формат'
  )
  validates_length_of(
    :password_digest,
    minimum: 60,
    maximum: 60
  )
  validates(
      :email,
      presence: {
          message: <<~MSG
        Обязательное поле
          MSG
      }
  )

  def unified_name
    email
  end
end
