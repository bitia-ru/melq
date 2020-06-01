class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user, optional: true
  belongs_to :comment, optional: true
  has_one_attached :author_avatar
  has_many :comments, dependent: :destroy

  validates_format_of(
      :author_name,
      with: /\A[а-яА-Яa-zA-Z0-9_]*\s{0,1}[а-яА-Яa-zA-Z0-9_]*\z/i,
      message: 'Неверный формат',
      unless: ->(u) { u.author_name.nil? }
  )
  validates_length_of(
      :author_name,
      minimum: 3,
      unless: ->(u) { u.author_name.nil? }
  )
  validates(
      :content,
      presence: {
          message: 'Обязательное поле'
      }
  )
end
