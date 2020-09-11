require 'rails_helper'

class Anonymou
  def self.all
    [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]
  end

  def self.find(id)
    all[id.to_i]
  end
end

RSpec.describe Purable, type: :controller do
  controller(ActionController::Base) do
    include Resourceable
    include Purable

    respond_to :json

    def show
      @metadata[:foo] = anonymou

      super
    end

    private

    # TODO: Make <resource>_params method non obligatory
    def anonymou_params
      params.permit[:anonymou]
    end

    # TODO: Purable without authorize
    def authorize(_object)
      nil
    end
  end

  before do
    routes.draw { resources :anonymous }

    request.accept = 'application/json'
  end

  describe 'GET index' do
    before { get :index }

    it 'should success' do
      expect(response).to have_http_status(:success)
    end

    it 'should return entities' do
      expect(response.body).to eq(
        JSON.dump(
          {
            metadata: {
              all: Anonymou.all.count
            },
            entities: Anonymou.all
          }
        )
      )
    end
  end

  describe 'GET show' do
    before do
      get :show, params: { id: 7 }
    end

    it 'should success' do
      expect(response).to have_http_status(:success)
    end

    it 'should return entity' do
      expect(response.body).to eq(
        JSON.dump(
          {
            metadata: {
              foo: Anonymou.all[7]
            },
            entities: Anonymou.all[7]
          }
        )
      )
    end
  end
end
