# xo

status: **`NOT YET COMPLETED`**

Helping out a friend setup something non-trivial.

This repo is made public so the source code can be used as a reference for other acquaintances/strangers that I occassionally help out.

This does not follow standard React-Redux-TypeScript conventions for various reasons that may not be relevant to you, if you're not part of the group this boilerplate is primarily intended for (so it's pointless for me to list them here). Just keep that in mind if you're new to the React ecosystem not to take this boilerplate as gospel.

## Setup

```shell
git clone && \
  cd app/webappyarn install && yarn start
```

then open `localhost:4200`

The app itself should always be runnable and buildable on `master`, while other components of this codebase are not guaranteed to work or stay working while they're being completed/refined. Examples of these are the pre-render component, the translations script, and even the stand-in Node HTTP server.

## Stack

| Context | Tool/Lib/Spec          | Tech                                                                                    |
| ------- | ---------------------- | --------------------------------------------------------------------------------------- |
| Styles  | UI Framework           | [Semantic UI React](https://react.semantic-ui.com/)                                     |
|         | CSS Modules Impl       | [webpack-contrib/css-loader](https://github.com/webpack-contrib/css-loader)             |
|         | CSS Resetter           | [Normalize.css v8](https://necolas.github.io/normalize.css/)                            |
|         | Preprocessor           | [Less](http://lesscss.org/)                                                             |
|         | Postprocessor          | [Autoprefixer](https://autoprefixer.github.io/)                                         |
| Scripts | Types Transpiler       | [TypeScript](https://www.typescriptlang.org/)                                           |
|         | ESNext Transpiler      | [Babel 8](https://babeljs.io/)                                                          |
|         | Assets/Modules Bundler | [Webpack 4](https://webpack.js.org/)                                                    |
|         | Browser Polyfills      | [Babel 8 (via core-js)](https://babeljs.io/)                                            |
| App     | View Layer             | [React 16](https://reactjs.org/)                                                        |
|         | SPA Router             | [React Router 4](https://reacttraining.com/react-router/web)                            |
|         | State MGMT             | [Redux](https://redux.js.org/)                                                          |
|         | Immutability Utils     | [planttheidea/unchanged](https://github.com/planttheidea/unchanged)                     |
|         | XHR                    | [matthew-andrews/isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) |
|         | SEO                    | [React Helmet](https://github.com/nfl/react-helmet)                                     |
|         | I18N                   | [React Intl](https://github.com/yahoo/react-intl)                                       |
|         | Offline FNs            | [NekR/offline-plugin](https://github.com/NekR/offline-plugin)                           |
| Tests   | Runner                 | [Jest v23](https://jestjs.io/)                                                          |
|         | Assertions             | [Jest v23](https://jestjs.io/docs/en/expect)                                            |
|         | Mocking/Stubbing       | [Jest v23](https://jestjs.io/docs/en/mock-functions)                                    |
|         | Snapshots              | [Jest v23](https://jestjs.io/docs/en/snapshot-testing)                                  |
|         | Headless DOM Env       | [Jest v23 (via JSDOM)](https://jestjs.io/docs/en/configuration)                         |
|         | Coverage FNs           | [Jest v23 (via Istanbul)](https://jestjs.io/docs/en/configuration)                      |
|         | VDOM Utils             | [Enzyme v3](http://airbnb.io/enzyme/)                                                   |
| Syntax  | Types Linter           | [TSLint](https://palantir.github.io/tslint/)                                            |
|         | ES/JS Linter           | [ESLint](https://eslint.org/)                                                           |
|         | Static Analysis        | -                                                                                       |
|         | Formatter              | [Prettier](https://prettier.io/)                                                        |

## TODOS

- [ ] Complete configurations for private source maps.
- [ ] Add option to simplify source maps during hot-reloading since it's slowing the reload process.
- [ ] Get to the bottom of dynamic translation files generation.

## Important Reminders (so I don't forget)

- Remember to nullify global vars in renderer when process exits with any non-zero status so we won't have to worry about leaks down the road.

- There's an obvious memory leak somewhere in the frontend, use chrome profiler to figure out where.

- Merge the 3 React contexts.
