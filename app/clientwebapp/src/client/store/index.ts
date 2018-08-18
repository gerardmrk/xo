/**
 * main store entrypoint
 */
// tslint:disable:no-direct-store-import no-non-null-assertion
import asyncMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";

import API from "@client/api";
import AppTypes from "AppTypes";
import * as middleware from "@client/store/middleware";

export { middleware };

import * as user from "@client/store/user";
import * as session from "@client/store/session";
import * as globalLoader from "@client/store/global-loader";
import * as globalMessage from "@client/store/global-message";
import * as appStatuses from "@client/store/app-statuses";

export * from "@client/store/user";
export * from "@client/store/session";
export * from "@client/store/global-loader";
export * from "@client/store/global-message";
export * from "@client/store/app-statuses";

export type RootAction =
  | user.UserAction
  | session.SessionAction
  | globalLoader.GlobalLoaderAction
  | globalMessage.GlobalMessageAction
  | appStatuses.AppStatusesAction;

export type RootState = {
  user: user.UserState;
  session: session.SessionState;
  globalLoader: globalLoader.GlobalLoaderState;
  globalMessage: globalMessage.GlobalMessageState;
  appStatuses: appStatuses.AppStatusesState;
};

export const rootReducer = combineReducers({
  user: user.userReducer,
  session: session.sessionReducer,
  globalLoader: globalLoader.globalLoaderReducer,
  globalMessage: globalMessage.globalMessageReducer,
  appStatuses: appStatuses.appStatusesReducer
});

export const initStore = (api: API) => (
  initialState: AppTypes.Store.State | {}
): AppTypes.Store.Store => {
  return createStore<AppTypes.Store.State, AppTypes.Store.Action, AppTypes.Store.Dispatcher, void>(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(asyncMiddleware.withExtraArgument(api), ...Object.values(middleware))
    )
  );
};

export default initStore;
