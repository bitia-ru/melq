class PostCard < ApplicationRecord
  has_one_attached :image
  enum style: %w[image fill].each_with_object({}) { |v, a| a[v.to_sym] = v }
  belongs_to :main_tag, class_name: 'Tag', optional: true

  accepts_nested_attributes_for :image_attachment, allow_destroy: true
end
