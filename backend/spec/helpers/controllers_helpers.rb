# frozen_string_literal: true

module ControllersHelpers
  def parsed_response_body
    JSON.parse(response.body)
  end

  def clone_views
    # TODO: Change to right route, after switch to bitia-rails gem
    FakeFS::FileSystem.clone('./bitia-rails/app/views')
    FakeFS::FileSystem.clone('./app/views')
  end
end
