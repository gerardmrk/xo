/**
 * main store entrypoint
 */
import { StateType } from "typesafe-actions";
import { composeWithDevTools } from "redux-devtools-extension";
import asyncMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { createStore, applyMiddleware, Middleware, Store as BaseStore, Dispatch as BaseDispatch } from "redux"; // prettier-ignore

import API from "@client/api";
import * as middleware from "@client/store/middleware";
import rootReducer, { RootAction } from "@client/store/root-reducer";

// ---------------------------------------------------------------------------------------------------------------------
// *** main store typings ***
// ---------------------------------------------------------------------------------------------------------------------
export type StoreAction = RootAction;
export type StoreState = StateType<typeof rootReducer>;
export type Store = BaseStore<StoreState, StoreAction>;
export type StoreMiddleware = Middleware<void, StoreState, StoreDispatcher>;
export type StoreAsyncAction = ThunkAction<Promise<void>, StoreState, API, StoreAction>;
export type StoreDispatcher = BaseDispatch<StoreAction> & ThunkDispatch<StoreState, API, StoreAction>; // prettier-ignore

// ---------------------------------------------------------------------------------------------------------------------
// *** store initializer/configurer ***
// ---------------------------------------------------------------------------------------------------------------------
export const initStore = (api: API) => (initialState: StoreState): Store => {
  // prettier-ignore
  return createStore<StoreState, StoreAction, StoreDispatcher, void>(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        asyncMiddleware.withExtraArgument(api),
        ...Object.values(middleware)
      )
    )
  );
};

export default initStore;
