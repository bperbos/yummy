# README

Using rbenv, nvm, esbuild, typescript, dockerized postgres.

`rails db:seed` reads the content of recipes-en.json and dumps it into the db.

There are only two integration tests so far.

The db schema is as simple as a single table representing the json content from allrecipes, the search work is done by the full text search capabilities of postgres merging multiple fields.

# User Stories

- As a user, I can browse paginated recipes stored in the database and preview their title, rating, category, ingredients, preping and cooking time

- As a user, I can search recipes by their title, category and ingredients through a unique search bar and browse the results ranked by relevance (word match count)

- As a user, I can use the app on a desktop as well as a mobile screen
