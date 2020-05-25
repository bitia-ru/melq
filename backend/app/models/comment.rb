class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :comment, optional: true
  has_one_attached :author_avatar
end
