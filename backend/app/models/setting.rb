class Setting < ApplicationRecord
  has_one_attached :avatar

  def self.get
    find(1)
  end
end
