/**
 * action types for the user state
 */
import { createAction } from "typesafe-actions";

import { UserSettings } from "@client/store/user/models";
import { StoreMiddlewareFlags } from "@client/store/middleware";

// tslint:disable:typedef

// getSettings

export const getSettingsPending = createAction(
  "user.getSettingsPending",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const getSettingsSuccess = createAction(
  "user.getSettingsSuccess",
  resolve => (settings: UserSettings, flags: StoreMiddlewareFlags) => resolve(settings, flags)
);

export const getSettingsFailure = createAction(
  "user.getSettingsFailure",
  resolve => (error: Error, flags: StoreMiddlewareFlags) => resolve(error, flags)
);

// register

export const registerPending = createAction(
  "user.registerPending",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const registerSuccess = createAction(
  "user.registerSuccess",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const registerFailure = createAction(
  "user.registerFailure",
  resolve => (error: Error, flags: StoreMiddlewareFlags) => resolve(error, flags)
);

// changePassword

export const changePasswordPending = createAction(
  "user.changePasswordPending",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const changePasswordSuccess = createAction(
  "user.changePasswordSuccess",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const changePasswordFailure = createAction(
  "user.changePasswordFailure",
  resolve => (error: Error, flags: StoreMiddlewareFlags) => resolve(error, flags)
);

// requestPasswordReset

export const requestPasswordResetPending = createAction(
  "user.requestPasswordResetPending",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const requestPasswordResetSuccess = createAction(
  "user.requestPasswordResetSuccess",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const requestPasswordResetFailure = createAction(
  "user.requestPasswordResetFailure",
  resolve => (error: Error, flags: StoreMiddlewareFlags) => resolve(error, flags)
);

// resetPassword

export const resetPasswordPending = createAction(
  "user.resetPasswordPending",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const resetPasswordSuccess = createAction(
  "user.resetPasswordSuccess",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const resetPasswordFailure = createAction(
  "user.resetPasswordFailure",
  resolve => (error: Error, flags: StoreMiddlewareFlags) => resolve(error, flags)
);

// verifyCode

export const verifyCodePending = createAction(
  "user.verifyCodePending",
  resolve => (flags: StoreMiddlewareFlags) => resolve(undefined, flags)
);

export const verifyCodeSuccess = createAction(
  "user.verifyCodeSuccess",
  resolve => (token: string, flags: StoreMiddlewareFlags) => resolve(token, flags)
);

export const verifyCodeFailure = createAction(
  "user.verifyCodeFailure",
  resolve => (error: Error, flags: StoreMiddlewareFlags) => resolve(error, flags)
);
