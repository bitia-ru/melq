class InitialMigration < ActiveRecord::Migration[5.2]
  def up
    execute <<-DDL
      CREATE DOMAIN printable_string AS TEXT
      CHECK(
        VALUE ~ '^[[:print:]]*$'
      );
    DDL

    execute <<-DDL
      CREATE DOMAIN email AS TEXT
      CHECK(
        VALUE ~* '^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$'
      );
    DDL

    create_table :users do |t|
      t.column :email, :email
      t.string :password_digest

      t.timestamps
    end

    execute <<-DDL
      ALTER TABLE users
        ADD CONSTRAINT user_email_unique UNIQUE (email),
        ADD CONSTRAINT user_password_digest_length CHECK(char_length(password_digest) = 60);
    DDL

    execute <<-DDL
      CREATE TYPE can_comment AS ENUM (
        'authorized_only', 'everyone', 'nobody'
      );
    DDL

    create_table :posts do |t|
      t.string :title
      t.text :content
      t.boolean :published
      t.column :can_comment, :can_comment
      t.boolean :add_likes_auth_only
      t.integer :num_of_likes
      t.integer :num_of_reposts
      t.integer :num_of_views
      t.string :slug
      t.string :seo_title
      t.jsonb :seo_kw, default: []

      t.timestamps
    end

    execute <<-DDL
      ALTER TABLE posts
        ADD CONSTRAINT post_slug_unique UNIQUE (slug);
    DDL

    create_table :tags do |t|
      t.string :text
    end

    execute <<-DDL
      ALTER TABLE tags
        ADD CONSTRAINT tag_unique UNIQUE (text);
    DDL

    create_table :posts_tags, id: false do |t|
      t.belongs_to :post
      t.belongs_to :tag
    end

    create_table :comments do |t|
      t.belongs_to :post
      t.belongs_to :comment
      t.text :content
      t.string :author_name
      t.string :author_url

      t.timestamps
    end

    create_table :likes do |t|
      t.belongs_to :post
      t.jsonb :user_data
    end

    create_table :settings do |t|
      t.string :nickname
      t.text :about
      t.boolean :in_development
      t.string :access_key
      t.string :copyright_year
      t.string :about_blog_slug
      t.string :privacy_policy_slug
    end
  end

  def down
    raise ArgumentError, 'Rollback is not available for this migration'
  end
end
