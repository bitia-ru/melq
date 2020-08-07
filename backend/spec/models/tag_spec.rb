require 'rails_helper'
require 'fakefs/spec_helpers'

RSpec.describe Tag, type: :model do
  let!(:tag) { create(:tag) }

  describe '#notify_about_create_update_to_channel' do
    context 'when tag is created' do
      before do
        allow(EntitiesChannel).to receive(:broadcast_to).and_return(true)
        allow(ApplicationController).to receive(:render).and_return('{}')
        Tag.create!(text: 'new_tag')
      end

      it 'should be called and send data to channel' do
        expect(EntitiesChannel).to have_received(:broadcast_to).with('all', { tag: {} })
      end

      it 'should generate right tag data' do
        expect(ApplicationController).to have_received(:render)
          .with(partial: 'api/v1/tags/tag', locals: { tag: Tag.last })
      end
    end

    context 'when tag is updated' do
      before do
        allow(EntitiesChannel).to receive(:broadcast_to).and_return(true)
        allow(ApplicationController).to receive(:render).and_return('{}')
        tag.update(text: 'updated_tag')
      end

      it 'should be called and send data to channel' do
        expect(EntitiesChannel).to have_received(:broadcast_to).with('all', { tag: {} })
      end

      it 'should generate right tag data' do
        expect(ApplicationController).to have_received(:render)
          .with(partial: 'api/v1/tags/tag', locals: { tag: tag })
      end
    end
  end

  describe '#notify_about_destroy_to_channel' do
    context 'when tag is destroyed' do
      before do
        allow(EntitiesChannel).to receive(:broadcast_to).and_return(true)
        tag.destroy!
      end

      it 'should be called and send data to channel' do
        expect(EntitiesChannel).to have_received(:broadcast_to)
          .with('all', { tag: { id: tag.id, _destroy: true } })
      end
    end
  end
end
