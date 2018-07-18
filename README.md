# xo

Helping out a friend setup something non-trivial

## This is not boilerplate gospel, but if you're curious:

```shell
yarn install && yarn start
```
then open `localhost:4200`

## TODOS

- [ ] Complete configurations for private source maps.
- [ ] Add option to simplify source maps during hot-reloading since it's slowing the reload process.
- [ ] Get to the bottom of dynamic translation files generation.

## Reminders

- Nullify global vars in renderer when process exits with any non-zero status so we won't have to worry about leaks down the road.
