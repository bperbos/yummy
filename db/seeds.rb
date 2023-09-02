MAPPING = {
    cook_time: :cook_time_min,
    prep_time: :prep_time_min,
    image: :image_url,
}.with_indifferent_access

EXCEPT = %w(cuisine author)

file = File.read(File.join(Rails.root, 'recipes-en.json'))
recipes_json = JSON.parse(file)

recipes = 
    recipes_json.map do |recipe_json|
        recipe_json[:ingredients_string] = recipe_json['ingredients'].join(' ') # poor, though cant run callbacks effectively on insert_all
        recipe_json.except(*EXCEPT).transform_keys { |key| MAPPING.fetch(key, key) }
    end

# go easy on PG memory for the free plan of fly.io
recipes.each_slice(100) do |sliced|
    Recipe.insert_all(sliced)
end
