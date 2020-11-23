class AddSpecializationToSettings < ActiveRecord::Migration[5.2]
  def change
    add_column :settings, :specialization, :string
  end
end
