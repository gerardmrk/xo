/**
 * action types for the session state
 */

// tslint:disable:typedef

import { createAction } from "typesafe-actions";

import { AuthTokens } from "@client/store/session/models";
import { StoreMiddlewareFlags } from "@client/store/middleware";

export const loginPending = createAction(
  "session.loginPending",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const loginSuccess = createAction(
  "session.loginSuccess",
  resolve => (tokens: AuthTokens, flags: StoreMiddlewareFlags) => resolve(tokens, flags)
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
