/**
 * main store entrypoint
 */
import { StateType } from "typesafe-actions";
import { composeWithDevTools } from "redux-devtools-extension";
import asyncMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { createStore, applyMiddleware, Middleware, Store as BaseStore, Dispatch as BaseDispatch } from "redux"; // prettier-ignore
import API from "@client/api";
import rootReducer, { RootAction } from "@client/store/root-reducer";
import * as middleware from "@client/store/middleware";

type Dispatch = BaseDispatch<StoreAction>;
type AsyncDispatch = ThunkDispatch<StoreState, API, StoreAction>;
type StorePartial = (initialState: StoreState) => Store;
type StoreInitializer = (api: API) => StorePartial;

export type Store = BaseStore<StoreState, StoreAction>;
export type StoreState = StateType<typeof rootReducer>;
export type StoreAction = RootAction;
export type StoreAsyncAction = ThunkAction<Promise<void>, StoreState, API, StoreAction>;
export type StoreDispatcher = Dispatch & AsyncDispatch;
export type StoreMiddleware = Middleware<void, StoreState, StoreDispatcher>;

export const initStore: StoreInitializer = (api: API): StorePartial => (
  initialState: StoreState
): Store => {
  return createStore<StoreState, StoreAction, typeof middleware, void>(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(asyncMiddleware.withExtraArgument(api), ...Object.values(middleware))
    )
  );
};

export default initStore;
