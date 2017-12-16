class CreateSpots < ActiveRecord::Migration[5.1]
  def change
    create_table :spots do |t|
      t.float :latitude
      t.float :longitude
      t.text :description
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
