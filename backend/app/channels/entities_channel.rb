class EntitiesChannel < ApplicationCable::Channel
  def subscribed
    stream_for 'all'
  end
end
