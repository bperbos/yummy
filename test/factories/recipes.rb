
# frozen_string_literal: true

FactoryBot.define do
    factory :recipe do
        title { 'Golden Sweet Cornbread' }
        ingredients {
            [
                "1 cup all-purpose flour",
                "1 cup yellow cornmeal",
                "⅔ cup white sugar",
                "1 teaspoon salt",
                "3 ½ teaspoons baking powder",
                "1 egg",
                "1 cup milk",
                "⅓ cup vegetable oil"
            ]
        }
        category { 'bread' }
        image_url { '' }
        cook_time_min { 25 }
        prep_time_min { 10 }
        ratings { 4.7 }
    end
end
