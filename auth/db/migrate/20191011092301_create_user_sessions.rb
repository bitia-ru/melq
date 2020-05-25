class CreateUserSessions < ActiveRecord::Migration[5.2]
  def up
    create_table :user_sessions do |t|
      t.string :token
      t.text :user_agent
      t.datetime :valid_until
      t.boolean :success
      t.string :user_ip
      t.belongs_to :user

      t.timestamps
    end
  end

  def down
    raise ArgumentError, 'Rollback is not available for this migration'
  end
end
