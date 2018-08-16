/**
 * action types for the session state
 */

import { createAction } from "typesafe-actions";

import AppTypes from "AppTypes";
import { StoreMiddlewareFlags } from "@client/store/middleware";
import { TEST_ACTION } from "@client/store/global-loader/actions";

export { TEST_ACTION };

export const loginPending = createAction(
  "session.loginPending",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const loginSuccess = createAction(
  "session.loginSuccess",
  resolve => (tokens: AppTypes.AuthModels.AuthTokens, flags: StoreMiddlewareFlags) =>
    resolve(tokens, flags)
);

export const loginFailure = createAction(
  "session.loginFailure",
  resolve => (error: Error, flags: StoreMiddlewareFlags) => resolve(error, flags)
);

export const logoutPending = createAction(
  "session.logoutPending",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const logoutSuccess = createAction(
  "session.logoutSuccess",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const logoutFailure = createAction(
  "session.logoutFailure",
  resolve => (error: Error, flags: StoreMiddlewareFlags) => resolve(error, flags)
);
