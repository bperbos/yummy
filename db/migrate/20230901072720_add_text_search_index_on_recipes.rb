# check index used on #search

# "Sort  (cost=2615.21..2617.55 rows=937 width=828) (actual time=56.487..56.525 rows=486 loops=1)"
# "  Sort Key: (ts_rank(((setweight(to_tsvector('english'::regconfig, (COALESCE(title, ''::character varying))::text), 'A'::\"char\") || setweight(to_tsvector('english'::regconfig, (COALESCE(ingredients_string, ''::character varying))::text), 'B'::\"char\")) || setweight(to_tsvector('english'::regconfig, (COALESCE(category, ''::character varying))::text), 'C'::\"char\")), '''egg'' & ''garlic'''::tsquery)) DESC, ((((POSITION(('eggs and garlic'::text) IN (lower((((((COALESCE(title, ''::character varying))::text || ' '::text) || (COALESCE(ingredients_string, ''::character varying))::text) || ' '::text) || (COALESCE(category, ''::character varying))::text)))) - 1))::bit(8))::integer)"
# "  Sort Method: quicksort  Memory: 524kB"
# "  ->  Bitmap Heap Scan on recipes  (cost=27.26..2568.96 rows=937 width=828) (actual time=1.012..55.572 rows=486 loops=1)"
# "        Recheck Cond: (to_tsvector('english'::regconfig, (((((COALESCE(title, ''::character varying))::text || ' '::text) || (COALESCE(ingredients_string, ''::character varying))::text) || ' '::text) || (COALESCE(category, ''::character varying))::text)) @@ '''egg'' & ''garlic'''::tsquery)"
# "        Heap Blocks: exact=403"
# "        ->  Bitmap Index Scan on recipes_full_tsearch_index  (cost=0.00..27.03 rows=937 width=0) (actual time=0.738..0.739 rows=486 loops=1)"
# "              Index Cond: (to_tsvector('english'::regconfig, (((((COALESCE(title, ''::character varying))::text || ' '::text) || (COALESCE(ingredients_string, ''::character varying))::text) || ' '::text) || (COALESCE(category, ''::character varying))::text)) @@ '''egg'' & ''garlic'''::tsquery)"
# "Planning Time: 3.635 ms"
# "Execution Time: 56.741 ms"

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
