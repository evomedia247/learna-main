# Learna

> www.learna.ac.uk

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

Use VS Code for editing and install the following pluggings:

- ESLint
- Prettier - Code formatter
- Vetur

and if you want a really cool setup :)

- Material Icon Theme
- Color Highlight
- Code Spell Checker

learna.ac.uk hosted on Firebase

For deployment you will need the firebase tools:

```bash
npm install -g firebase-tools
firebase login
```

you can deploy with:

```bash
npm run deploy:staging
# or
npm run deploy:production
```

For speed tests you will need lighthouse:

```bash
npm install -g lighthouse
npm run lighthouse
```
