class Setting < ApplicationRecord
  has_one_attached :avatar

  after_update do
    EntitiesChannel.broadcast_to(
      'all',
      setting: JSON.parse(
        ApplicationController.render(
          partial: 'api/v1/settings/setting',
          locals: {
            setting: self
          }
        )
      )
    )
  end

  def self.get
    find(1)
  end
end
