# frozen_string_literal: true

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

# Although named in a generic manner, specific to recipes
module TextSearchQueriable
  extend ActiveSupport::Concern
    COLUMNS = %w(title category ingredients_string).map { |column| "coalesce(#{column}, '')" }
    COLUMNS_SEARCH_QUERY = COLUMNS.join(" || ' ' || ")
    WEIGHTS = %w(A B C)

    included do
      class << self
        def search(user_input)
            tsquery = tsquery(build_fulltext_query(user_input))
            normalized_columns = "lower(#{COLUMNS_SEARCH_QUERY})"
            Recipe
                .where("#{tsvector(COLUMNS_SEARCH_QUERY)} @@ #{tsquery}")
                .select("recipes.*, #{ts_rank(COLUMNS, tsquery)} as searchable_rank")
                .order('searchable_rank desc')
        end

        private

        def tokenize_fulltext_query(user_input)
          user_input.downcase.gsub(/[^[[:word:]]\s]/, ' ').split
        end

        def build_fulltext_query(user_input)
          tokens = tokenize_fulltext_query(user_input)
          tokens.map { |token| "#{token}:*" }.join(' & ')
        end

        def ts_rank(columns, ts_query)
          "ts_rank(#{set_column_weight(columns).join(' || ')}, #{ts_query})"
        end
      
        def tsquery(tokenized_input)
          "to_tsquery('english', '#{tokenized_input}')"
        end
      
        def tsvector(column)
          "to_tsvector('english', #{column})"
        end
      
        def set_column_weight(columns)
          columns.map.with_index { |column, index| "setweight(#{tsvector(column)}, '#{WEIGHTS[index]}')" }
        end
      end
    end
  end
  