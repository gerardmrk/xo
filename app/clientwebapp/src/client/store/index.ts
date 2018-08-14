/**
 * main store entrypoint
 */
// tslint:disable:no-direct-store-import
import { StateType } from "typesafe-actions";
import { composeWithDevTools } from "redux-devtools-extension";
import asyncMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, Middleware, Store as BaseStore, Dispatch as BaseDispatch } from "redux"; // prettier-ignore

import API from "@client/api";

import * as middleware from "@client/store/middleware";
export { middleware };

import * as user from "@client/store/user";
export { actions as userActions, asyncActions as userAsyncActions, models as userModels } from "@client/store/user"; // prettier-ignore

import * as session from "@client/store/session";
export { actions as sessionActions, asyncActions as sessionAsyncActions, models as sessionModels } from "@client/store/session"; // prettier-ignore

import * as globalLoader from "@client/store/global-loader";
export { actions as globalLoaderActions } from "@client/store/global-loader";

import * as globalMessage from "@client/store/global-message";
export { actions as globalMessageActions, models as globalMessageModels } from "@client/store/global-message"; // prettier-ignore

import * as appStatuses from "@client/store/app-statuses";
export { actions as appStatusesActions } from "@client/store/app-statuses";

type RootAction =
  | user.Action
  | session.Action
  | globalLoader.Action
  | globalMessage.Action
  | appStatuses.Action;

// prettier-ignore
const rootReducer = combineReducers<{
  user: user.State;
  session: session.State;
  globalLoader: globalLoader.State;
  globalMessage: globalMessage.State;
  appStatuses: appStatuses.State;
}, RootAction>({
  user: user.reducer,
  session: session.reducer,
  globalLoader: globalLoader.reducer,
  globalMessage: globalMessage.reducer,
  appStatuses: appStatuses.reducer
});

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
