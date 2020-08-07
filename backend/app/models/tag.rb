class Tag < ApplicationRecord
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
      tag: JSON.parse(
        ApplicationController.render(
          partial: 'api/v1/tags/tag',
          locals: {
            tag: self
          }
        )
      )
    )
  end

  def notify_about_destroy_to_channel
    EntitiesChannel.broadcast_to(
      'all',
      tag: {
        id: id,
        _destroy: true
      }
    )
  end
end
