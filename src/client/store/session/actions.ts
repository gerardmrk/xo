/**
 * action types for the session state
 */

// tslint:disable:typedef

import { createAction } from "typesafe-actions";

import { MiddlewareFlags } from "@client/store/middleware";
import { AuthTokens } from "@client/store/session/models";

// prettier-ignore
export const loginPending = createAction(
  "session.loginPending",
  resolve => (flags: MiddlewareFlags) => resolve(undefined, flags)
);

// prettier-ignore
export const loginSuccess = createAction(
  "session.loginSuccess",
  resolve => (tokens: AuthTokens, flags: MiddlewareFlags) => resolve(tokens, flags)
);

// prettier-ignore
export const loginFailure = createAction(
  "session.loginFailure",
  resolve => (error: Error, flags: MiddlewareFlags) => resolve(error, flags)
);

// prettier-ignore
export const logoutPending = createAction(
  "session.logoutPending",
  resolve => (flags: MiddlewareFlags) => resolve(undefined, flags)
);

// prettier-ignore
export const logoutSuccess = createAction(
  "session.logoutSuccess",
  resolve => (flags: MiddlewareFlags) => resolve(undefined, flags)
);

// prettier-ignore
export const logoutFailure = createAction(
  "session.logoutFailure",
  resolve => (error: Error, flags: MiddlewareFlags) => resolve(error, flags)
);
