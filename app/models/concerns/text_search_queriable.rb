# frozen_string_literal: true

# Although named in a generic manner, specific to recipes
module TextSearchQueriable
  extend ActiveSupport::Concern
    COLUMNS = %w(title ingredients_string category).map { |column| "coalesce(#{column}, '')" }
    WEIGHTS = %w(A B C)

    included do
      class << self
        def search(user_input)
            tsquery = tsquery(build_user_query(user_input))
            Recipe
                .where("#{tsvector(COLUMNS.join(" || ' ' || "))} @@ #{tsquery}")
                .select("recipes.*, #{ts_rank(COLUMNS, tsquery)} as search_rank")
                .order('search_rank desc')
        end

        private

        def tokenize_user_query(user_input)
          user_input.downcase.gsub(/[^[[:word:]]\s]/, ' ').split
        end

        def build_user_query(user_input)
          tokens = tokenize_user_query(user_input)

          # might be overkill / wrong even to do a prefix search on each token
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
  