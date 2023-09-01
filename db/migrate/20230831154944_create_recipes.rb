class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :ingredients, array: true
      t.string :category
      t.string :image_url
      t.string :ingredients_string
      t.integer :cook_time_min
      t.integer :prep_time_min
      t.float :ratings

      t.timestamps
    end
  end
end
