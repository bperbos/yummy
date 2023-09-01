class Recipe < ApplicationRecord
    include TextSearchQueriable

    paginates_per 9

    before_save :set_ingredients_string

    private

    def set_ingredients_string
        return unless ingredients_changed?
        
        self.ingredients_string = ingredients.join(' ')
    end
end
