class User < ApplicationRecord
  has_many :user_sessions, dependent: :destroy

  validates(
      :email,
      uniqueness: {
          message: 'Пользователь с таким email уже существует'
      },
      unless: ->(u) { u.email.nil? }
  )
  validates_format_of(
      :email,
      with: /\A([^@\s]+)@((?:[-a-zA-Z0-9]+\.)+[a-zA-Z]{2,})\z/i,
      message: 'Неверный формат',
      unless: ->(u) { u.email.nil? }
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

  def session(token)
    user_sessions.where(token: token).where('valid_until > ?', DateTime.now).last
  end

  def self.session(token)
    UserSession.where(token: token).where('valid_until > ?', DateTime.now).last
  end
end
