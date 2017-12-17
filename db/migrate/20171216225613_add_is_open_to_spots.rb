class AddIsOpenToSpots < ActiveRecord::Migration[5.1]
  def change
    add_column :spots, :is_open, :boolean
  end
end
