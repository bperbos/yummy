class AddTextSearchIndexOnRecipes < ActiveRecord::Migration[7.0]
  def up
    execute <<~SQL.squish
      CREATE INDEX recipes_full_tsearch_index ON recipes USING gin (
        to_tsvector('english'::regconfig, COALESCE(title, '') || ' ' ||  COALESCE(ingredients_string, '') || ' ' ||  COALESCE(category, ''))
      );
    SQL
  end

  def down
    execute <<~SQL.squish
      DROP INDEX IF EXISTS recipes_full_tsearch_index;
    SQL
  end
end
