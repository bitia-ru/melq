class Tag < ApplicationRecord
  after_create do
    notify_about_changes_to_channel 'create'
  end

  after_update do
    notify_about_changes_to_channel 'update'
  end

  after_destroy do
    notify_about_changes_to_channel 'destroy'
  end

  def notify_about_changes_to_channel action
    EntitiesChannel.broadcast_to(
        'all',
        body: {
            tag: JSON.parse(
                ApplicationController.render(
                    partial: 'api/v1/tags/tag',
                    locals: {
                        tag: self,
                        destroy: action == 'destroy'
                    }
                )
            )
        }
    )
  end
end
