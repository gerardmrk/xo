/**
 * action types for the user state
 */
import { createAction } from "typesafe-actions";

import { UserSettings } from "@client/store/user/models";
import { MiddlewareFlags } from "@client/store/middleware";

// tslint:disable:typedef

// getSettings

export const getSettingsPending = createAction(
  "user.getSettingsPending",
  resolve => (flags: MiddlewareFlags) => resolve(undefined, flags)
);

export const getSettingsSuccess = createAction(
  "user.getSettingsSuccess",
  resolve => (settings: UserSettings, flags: MiddlewareFlags) => resolve(settings, flags)
);

export const getSettingsFailure = createAction(
  "user.getSettingsFailure",
  resolve => (error: Error, flags: MiddlewareFlags) => resolve(error, flags)
);

// register

export const registerPending = createAction(
  "user.registerPending",
  resolve => (flags: MiddlewareFlags) => resolve(undefined, flags)
);

export const registerSuccess = createAction(
  "user.registerSuccess",
  resolve => (flags: MiddlewareFlags) => resolve(undefined, flags)
);

export const registerFailure = createAction(
  "user.registerFailure",
  resolve => (error: Error, flags: MiddlewareFlags) => resolve(error, flags)
);

// changePassword

export const changePasswordPending = createAction(
  "user.changePasswordPending",
  resolve => (flags: MiddlewareFlags) => resolve(undefined, flags)
);

export const changePasswordSuccess = createAction(
  "user.changePasswordSuccess",
  resolve => (flags: MiddlewareFlags) => resolve(undefined, flags)
);

export const changePasswordFailure = createAction(
  "user.changePasswordFailure",
  resolve => (error: Error, flags: MiddlewareFlags) => resolve(error, flags)
);

// requestPasswordReset

export const requestPasswordResetPending = createAction(
  "user.requestPasswordResetPending",
  resolve => (flags: MiddlewareFlags) => resolve(undefined, flags)
);

export const requestPasswordResetSuccess = createAction(
  "user.requestPasswordResetSuccess",
  resolve => (flags: MiddlewareFlags) => resolve(undefined, flags)
);

export const requestPasswordResetFailure = createAction(
  "user.requestPasswordResetFailure",
  resolve => (error: Error, flags: MiddlewareFlags) => resolve(error, flags)
);

// resetPassword

export const resetPasswordPending = createAction(
  "user.resetPasswordPending",
  resolve => (flags: MiddlewareFlags) => resolve(undefined, flags)
);

export const resetPasswordSuccess = createAction(
  "user.resetPasswordSuccess",
  resolve => (flags: MiddlewareFlags) => resolve(undefined, flags)
);

export const resetPasswordFailure = createAction(
  "user.resetPasswordFailure",
  resolve => (error: Error, flags: MiddlewareFlags) => resolve(error, flags)
);
