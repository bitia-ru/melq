require 'rails_helper'

RSpec.describe Resourceable do
  let(:resource_example) { 42 }
  let(:resources_example) { [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377] }

  let(:resourceable_class) do
    Class.new do
      def self.helper_method(_method_name); end

      def initialize(resource:, resources:)
        @resource = :apple

        @apple = resource
        @apples = resources
      end

      include Resourceable
    end
  end

  let(:instance) do
    resourceable_class.new(
      resource: resource_example,
      resources: resources_example
    )
  end

  describe '#resource_name' do
    it 'returns the value of @resource' do
      expect(instance.resource_name).to eq :apple
    end
  end

  describe '#resources_name' do
    it 'returns the value of @resources' do
      expect(instance.resources_name).to eq :apples
    end
  end

  describe '#resource' do
    it 'returns the value of instance variable "@resource"' do
      expect(instance.resource).to eq resource_example
    end
  end

  describe '#resources' do
    it 'returns the value of instance variable with pluralized version of name "@resource"' do
      expect(instance.resources).to eq resources_example
    end
  end
end
