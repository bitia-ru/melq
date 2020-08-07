require 'rails_helper'
require 'fakefs/spec_helpers'

RSpec.describe User, type: :model do
  let!(:user) { create(:user) }

  describe '#valid?' do
    context 'when email is already used' do
      it 'should return false' do
        expect(User.new(email: user.email, password_digest: user.password_digest).valid?)
          .to eq false
      end
    end

    context 'when password_digest length is not 60' do
      before do
        user.assign_attributes(password_digest: '123')
      end

      it 'should return false' do
        expect(user.valid?).to eq false
      end
    end

    context 'when email has wrong format' do
      before do
        user.assign_attributes(email: 'email')
      end

      it 'should return false' do
        expect(user.valid?).to eq false
      end
    end

    context 'when email is not set' do
      before do
        user.assign_attributes(email: nil)
      end

      it 'should return false' do
        expect(user.valid?).to eq false
      end
    end
  end
end
