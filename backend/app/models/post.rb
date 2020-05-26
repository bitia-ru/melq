class Post < ApplicationRecord
  has_many_attached :images
  has_and_belongs_to_many :tags
  enum can_comment: %w[authorized_only everyone nobody].each_with_object({}) { |v, a| a[v.to_sym] = v }

  accepts_nested_attributes_for :tags, allow_destroy: true
  accepts_nested_attributes_for :images_attachments, allow_destroy: true

  validates(
      :slug,
      uniqueness: {
          message: 'Slug должен быть уникален'
      }
  )
  validates(
      :slug,
      presence: {
          message: 'Обязательное поле'
      }
  )
end
