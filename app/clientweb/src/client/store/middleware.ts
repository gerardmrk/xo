/**
 * Store middleware (https://redux.js.org/advanced/middleware)
 *
 * any actions to the store will be intercepted by all of these middleware.
 *
 * In most instances, you'll likely want to call `next(action)` first, before doing anything else.
 * Not doing so means any action passing through this middleware will never reach the store.
 *
 */
import debug from "debug";
import { MiddlewareAPI } from "redux";

import AppTypes from "AppTypes";
import { globalLoaderActions, globalMessageActions } from "@client/store";

// initialize debuggers
const debugGL = debug("store:middleware:globalLoader");
const debugGM = debug("store:middleware:globalMessage");

type ActionWithMeta = AppTypes.Store.Action & { meta: StoreMiddlewareFlags };

export type StoreMiddlewareFlags = {
  showLoader?: boolean | string;
  showMessage?: AppTypes.GlobalMessage;
};

// This middleware checks all passing actions for two different flags:
// - globalloadershow
// - globalloaderhide
// prettier-ignore
export const globalLoaderMiddleware: AppTypes.Store.Middleware = (store: MiddlewareAPI<AppTypes.Store.Dispatcher, AppTypes.Store.State>) => (next: AppTypes.Store.Dispatcher) => (action: AppTypes.Store.Action): void => {

  next(action);

  if (
    !(<ActionWithMeta>action).meta ||
    (<ActionWithMeta>action).meta.showLoader === undefined
  ) {
    return;
  }

  debugGL(
    "[%s]: meta.showLoader='%s'",
    action.type,
    (<ActionWithMeta>action).meta.showLoader
  );

  const { showLoader } = (<ActionWithMeta>action).meta;
  if (!!showLoader) {
    store.dispatch(globalLoaderActions.show(
      typeof showLoader === "string" ? showLoader : undefined
    ));
  } else {
    store.dispatch(globalLoaderActions.hide());
  }
};

// prettier-ignore
export const globalMessageMiddleware: AppTypes.Store.Middleware = (store: MiddlewareAPI<AppTypes.Store.Dispatcher, AppTypes.Store.State>) => (next: AppTypes.Store.Dispatcher) => (action: AppTypes.Store.Action): void => {

  next(action);

  if (
    !(<ActionWithMeta>action).meta ||
    (<ActionWithMeta>action).meta.showMessage === undefined
  ) {
    return;
  }

  debugGM(
    "[%s]: meta.showMessage='%s'",
    action.type,
    (<ActionWithMeta>action).meta.showMessage
  );

  const { showMessage } = (<ActionWithMeta>action).meta;
  if (!!showMessage) {
    store.dispatch(globalMessageActions.show(showMessage));
  }
};
