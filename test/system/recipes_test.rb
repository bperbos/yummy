require "application_system_test_case"

class RecipesTest < ApplicationSystemTestCase
  test "nominal case" do
    create :recipe
    create :recipe, title: 'Ham', ingredients: ['ham']
    create :recipe, title: 'Ham with stuff', ingredients: ['ham', 'stuff']

    visit root_path
  
    assert_text "yummy"
    assert_text "Search for recipes"

    # landing state
    assert_selector '.recipe-card', count: 3
    assert_text 'Golden Sweet Cornbread'
    assert_text 'Ham'
    assert_text 'Ham with stuff'
    assert_text '4.7'
    assert_text 'Prep 10min'
    assert_text 'Cook 25min'
    assert_text '1 cup all-purpose flour'

    # multiple title matches
    fill_in 'search', with: 'ham'

    assert_selector '.recipe-card', count: 2
    assert_no_text 'Golden Sweet Cornbread'
    
    # simple search with single title match
    fill_in 'search', with: 'stuff'

    assert_selector '.recipe-card', count: 1
    assert_text 'Ham with stuff'

    # search with single ingredients match
    fill_in 'search', with: 'egg milk'

    assert_selector '.recipe-card', count: 1
    assert_text 'Golden Sweet Cornbread'
  end
end
