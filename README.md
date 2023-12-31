
# > https://pennylane-yummy.fly.dev
<img width="1717" alt="Capture d’écran 2023-09-02 à 18 09 16" src="https://github.com/bperbos/yummy/assets/40390077/019ca861-387c-4c98-acbd-9dbed52562f5">


# README
Using [rbenv](https://github.com/rbenv/rbenv), [nvm](https://github.com/nvm-sh/nvm), [esbuild](https://esbuild.github.io/), docker, typescript, postgres.

`rails db:seed` reads the content of recipes-en.json and dumps it into the db.

There are only two integration tests so far - don't shoot, I can explain 😶

The db schema is as simple as a single table representing the json content from allrecipes, the search work is done by the full text search capabilities of postgres merging multiple fields.

```
rbenv install
nvm install
npm i -g yarn
docker-compose up
bin/rails db:prepare
bin/dev
```

# User Stories

- As a user, I can browse paginated recipes stored in the database and preview their title, rating, category, ingredients, preping and cooking time

- As a user, I can search recipes by their title, category and ingredients through a unique search bar and browse the results ranked by relevance (word match count)

- As a user, I can use the app on a desktop as well as a mobile screen
