class CreatePostCards < ActiveRecord::Migration[5.2]
  def up
    execute <<-DDL
      CREATE TYPE style AS ENUM (
        'image', 'fill'
      );
    DDL

    create_table :post_cards do |t|
      t.string :post_slug
      t.string :title
      t.text :description
      t.column :style, :style
      t.belongs_to :main_tag, class_name: 'Tag', optional: true
      t.string :fill_color
    end
  end

  def down
    raise ArgumentError, 'Rollback is not available for this migration'
  end
end
