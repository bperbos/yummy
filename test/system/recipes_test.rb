require "application_system_test_case"

class RecipesTest < ApplicationSystemTestCase
  before do
    create :recipe
    create :recipe, title: 'Ham', ingredients: ['ham']
    create :recipe, title: 'Ham with stuff', ingredients: ['ham', 'stuff']
  end

  test "nominal case" do
    visit root_path
  
    assert_text "yummy"

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

    # no results
    fill_in 'search', with: 'noresults'

    assert_no_selector '.recipe-card'
    assert_text 'No results for noresults'
  end

  test "paginates results" do
    Recipe.stubs(:default_per_page).returns(1)

    visit root_path

    assert_text "yummy"

    assert_text 'Page 1 out of 3'
    assert_button 'Prev', disabled: true
    assert_button 'Next', disabled: false
    assert_selector '.recipe-card', count: 1

    click_on 'Next'

    assert_text 'Page 2 out of 3'
    assert_button 'Prev', disabled: false
    assert_button 'Next', disabled: false

    click_on 'Next'

    assert_text 'Page 3 out of 3'
    assert_button 'Prev', disabled: false
    assert_button 'Next', disabled: true

    # interacting with search resets pagination
    fill_in 'search', with: 'cornbread'

    assert_text 'Page 1 out of 1'
    assert_button 'Prev', disabled: true
    assert_button 'Next', disabled: true
  end
end
