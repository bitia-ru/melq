class AddPublishedToPostCards < ActiveRecord::Migration[5.2]
  def change
    add_column :post_cards, :published, :boolean, default: false
  end
end
