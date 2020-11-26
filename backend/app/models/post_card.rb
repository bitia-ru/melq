class PostCard < ApplicationRecord
  has_one_attached :image
  enum style: %w[image fill].each_with_object({}) { |v, a| a[v.to_sym] = v }
  belongs_to :main_tag, class_name: 'Tag', optional: true

  accepts_nested_attributes_for :image_attachment, allow_destroy: true

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
      post_card: JSON.parse(
        ApplicationController.render(
          partial: 'api/v1/post_cards/post_card',
          locals: {
            post_card: self
          }
        )
      )
    )
  end

  def notify_about_destroy_to_channel
    EntitiesChannel.broadcast_to(
      'all',
      post_card: {
        id: id,
        _destroy: true
      }
    )
  end
end
