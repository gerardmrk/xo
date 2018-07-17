/**
 * main store entrypoint
 */
import { StateType } from "typesafe-actions";
import { composeWithDevTools } from "redux-devtools-extension";
import asyncMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  createStore,
  applyMiddleware,
  Middleware,
  Store as BaseStore,
  Dispatch as BaseDispatch
} from "redux";
import API from "@client/api";
import rootReducer, { RootAction } from "@client/store/root-reducer";
import {
  globalLoaderMiddleware,
  globalMessageMiddleware
} from "@client/store/middleware";

type Dispatch = BaseDispatch<StoreAction>;
type AsyncDispatch = ThunkDispatch<StoreState, API, StoreAction>;

// prettier-ignore
export type Store = BaseStore<StoreState, StoreAction>;
// prettier-ignore
export type StoreState = StateType<typeof rootReducer>;
// prettier-ignore
export type StoreAction = RootAction;
// prettier-ignore
export type StoreAsyncAction = ThunkAction<Promise<void>, StoreState, API, StoreAction>;
// prettier-ignore
export type StoreMiddleware = Middleware<void, StoreState, StoreDispatcher>;
// prettier-ignore
export type StoreDispatcher = Dispatch & AsyncDispatch;
// prettier-ignore
export type StoreInitializer = (api: API) => (initialState: StoreState) => Store;

// prettier-ignore
// tslint:disable-next-line: typedef
export const initStore: StoreInitializer = (api: API) => (initialState: StoreState): Store => {
  return <Store>(createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(
      asyncMiddleware.withExtraArgument(api),
      globalLoaderMiddleware,
      globalMessageMiddleware
    ))
  ));
};

export default initStore;
