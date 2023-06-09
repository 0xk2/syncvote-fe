# Hectagon

<p align="center">
  <a href="https://hectagon.finance/" target="blank"><img src="
https://539947357-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FQC6YR2YUPWf8CjZ47TNI%2Ficon%2FCZQku5cw38q8J5SOdXa5%2FHECTAGON%20512x512.png?alt=media&token=2a5b6996-1915-43d9-baa5-7d2c24b2c207" width="200" alt="Hectagon Logo" /></a>
</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run build
$ npm run preview
```

## Structure

```
├── public
├── src
│   ├── _api               -> Mock JSON data to be used for working apps
│   ├── assets
│   │   ├── images
|   |   ├── svgs           -> SVG components
│   ├── components         -> Common components used across a theme
│   │   ├── commons        -> Common components
│   │   ├── base-card      -> Card components using for slider, grid.
│   │   ├── ...
│   ├── redux              -> State redux for app
│   ├── routing            -> App routing
│   ├── types              -> Types and interfaces
│   ├── utils
│   │   ├── constants      -> App constants
│   │   ├── helper         -> App helper function
│   │   ├── locales        -> Translate function
│   │   │   ├── languages  -> Define translate languages
│   │   ├── utilities      -> Translate function
│   ├── views              -> View files for all modules
│   │   ├── layouts        -> Common layouts
│   │   ├── modules        -> Module view
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
├── .editorconfig
├── .env
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── index.html
├── package-lock.json      -> Package lock file.
├── package.json           -> Package json file.
├── postcss.config.cjs
├── tailwind.config.cjs
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── README.md
```

## Revamp note

- Tearing down a building going from top to bottom!
- Building new one going from bottom to top!

## License

[MIT](https://choosealicense.com/licenses/mit/)
