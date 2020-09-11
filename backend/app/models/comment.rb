class Comment < ApplicationRecord
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

  after_create do
    notify_about_create_update_to_channel
  end

  after_update do
    notify_about_create_update_to_channel
  end

  after_destroy do
    notify_about_destroy_to_channel
  end

  def notify_about_create_update_to_channel
    EntitiesChannel.broadcast_to(
      'all',
      comment: JSON.parse(
        ApplicationController.render(
          partial: 'api/v1/comments/comment',
          locals: {
            comment: self
          }
        )
      )
    )
  end

  def notify_about_destroy_to_channel
    EntitiesChannel.broadcast_to(
      'all',
      comment: {
        id: id,
        _destroy: true
      }
    )
  end
end
