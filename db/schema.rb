# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_01_072720) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "recipes", force: :cascade do |t|
    t.string "title"
    t.string "ingredients", array: true
    t.string "category"
    t.string "image_url"
    t.string "ingredients_string"
    t.integer "cook_time_min"
    t.integer "prep_time_min"
    t.float "ratings"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index "to_tsvector('english'::regconfig, (((((COALESCE(title, ''::character varying))::text || ' '::text) || (COALESCE(ingredients_string, ''::character varying))::text) || ' '::text) || (COALESCE(category, ''::character varying))::text))", name: "recipes_full_tsearch_index", using: :gin
  end

end
