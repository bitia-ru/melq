require 'rails_helper'
require 'fakefs/spec_helpers'

RSpec.describe Comment, type: :model do
  let!(:comment) { create(:comment) }

  describe '#valid?' do
    context 'when author_name is nil' do
      before do
        comment.assign_attributes(author_name: nil)
      end

      it 'should return true' do
        expect(comment.valid?).to eq true
      end
    end

    context 'when author_name is invalid' do
      before do
        comment.assign_attributes(author_name: 'foo-bar')
      end

      it 'should return false' do
        expect(comment.valid?).to eq false
      end
    end

    context 'when author_name is valid' do
      before do
        comment.assign_attributes(author_name: 'foo_bar')
      end

      it 'should return true' do
        expect(comment.valid?).to eq true
      end
    end

    context 'when author_name is too short' do
      before do
        comment.assign_attributes(author_name: 'a')
      end

      it 'should return false' do
        expect(comment.valid?).to eq false
      end
    end

    context 'when content is not present' do
      before do
        comment.assign_attributes(content: nil)
      end

      it 'should return false' do
        expect(comment.valid?).to eq false
      end
    end
  end

  describe '#notify_about_create_update_to_channel' do
    context 'when comment is created' do
      before do
        allow(EntitiesChannel).to receive(:broadcast_to).and_return(true)
        allow(ApplicationController).to receive(:render).and_return('{}')
        Comment.create!(content: 'New comment')
      end

      it 'should be called and send data to channel' do
        expect(EntitiesChannel).to have_received(:broadcast_to).with('all', { comment: {} })
      end

      it 'should generate right comment data' do
        expect(ApplicationController).to have_received(:render)
          .with(partial: 'api/v1/comments/comment', locals: { comment: Comment.last })
      end
    end

    context 'when comment is updated' do
      before do
        allow(EntitiesChannel).to receive(:broadcast_to).and_return(true)
        allow(ApplicationController).to receive(:render).and_return('{}')
        comment.update(content: 'Updated comment')
      end

      it 'should be called and send data to channel' do
        expect(EntitiesChannel).to have_received(:broadcast_to).with('all', { comment: {} })
      end

      it 'should generate right comment data' do
        expect(ApplicationController).to have_received(:render)
          .with(partial: 'api/v1/comments/comment', locals: { comment: comment })
      end
    end
  end

  describe '#notify_about_destroy_to_channel' do
    context 'when comment is destroyed' do
      before do
        allow(EntitiesChannel).to receive(:broadcast_to).and_return(true)
        comment.destroy!
      end

      it 'should be called and send data to channel' do
        expect(EntitiesChannel).to have_received(:broadcast_to)
          .with('all', { comment: { id: comment.id, _destroy: true } })
      end
    end
  end
end
