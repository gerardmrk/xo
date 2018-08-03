/**
 * Store middleware (https://redux.js.org/advanced/middleware)
 *
 * any actions to the store will be intercepted by all of these middleware.
 *
 */
import * as debug from "debug";
import { MiddlewareAPI } from "redux";
import { GlobalMessage } from "@client/store/global-message/models";
import * as globalLoaderActions from "@client/store/global-loader/actions";
import * as globalMessageActions from "@client/store/global-message/actions";
import { StoreState, StoreAction, StoreDispatcher, StoreMiddleware } from "@client/store";

// initialize debuggers
const debugGL = debug("store:middleware:globalLoader");
const debugGM = debug("store:middleware:globalMessage");

type ActionWithMeta = StoreAction & { meta: StoreMiddlewareFlags };

export type StoreMiddlewareFlags = {
  showLoader?: boolean | string;
  showMessage?: GlobalMessage;
};

// prettier-ignore
// This middleware checks all passing actions for two different flags:
// - globalloadershow
// - globalloaderhide
export const globalLoaderMiddleware: StoreMiddleware = (store: MiddlewareAPI<StoreDispatcher, StoreState>) => (next: StoreDispatcher) => (action: StoreAction): void => { // tslint:disable-line:typedef
  next(action);

  if (!(<ActionWithMeta>action).meta || (<ActionWithMeta>action).meta.showLoader === undefined) return;

  debugGL("detected action.type='%s', action.meta.showLoader='%s'", action.type, (<ActionWithMeta>action).meta.showLoader);

  const { showLoader } = (<ActionWithMeta>action).meta;
  if (!!showLoader) {
    store.dispatch(globalLoaderActions.show(typeof showLoader === 'string' ? showLoader : undefined));
  } else {
    store.dispatch(globalLoaderActions.hide());
  }
};

// prettier-ignore
export const globalMessageMiddleware: StoreMiddleware = (store: MiddlewareAPI<StoreDispatcher, StoreState>) => (next: StoreDispatcher) => (action: StoreAction): void => { // tslint:disable-line:typedef
  next(action);

  if (!(<ActionWithMeta>action).meta || (<ActionWithMeta>action).meta.showMessage === undefined) return;

  debugGM("detected action.type='%s', action.meta.showMessage='%s'", action.type, (<ActionWithMeta>action).meta.showMessage);

  const { showMessage } = (<ActionWithMeta>action).meta;
  if (!!showMessage) {
    store.dispatch(globalMessageActions.show(showMessage));
    if (showMessage.autoDismiss) {
      setTimeout(() => {
        store.dispatch(globalMessageActions.hide());
      }, 5000);
    }
  }
};
