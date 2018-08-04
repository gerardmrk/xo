/**
 * action types for the user state
 */
import { createAction } from "typesafe-actions";

import { UserSettings } from "@client/store/user/models";
import { StoreMiddlewareFlags } from "@client/store/middleware";
import { FieldValidationResult } from "@client/utils/local-validators";

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

// validateEmail

export const validateEmailPending = createAction("user.validateEmailPending", resolve => () =>
  resolve()
);

export const validateEmailSuccess = createAction(
  "user.validateEmailSuccess",
  resolve => (validation: FieldValidationResult) => resolve(validation)
);

export const validateEmailFailure = createAction(
  "user.validateEmailFailure",
  resolve => (error: Error) => resolve(error)
);

// validateUsername

export const validateUsernamePending = createAction("user.validateUsernamePending", resolve => () =>
  resolve()
);

export const validateUsernameSuccess = createAction(
  "user.validateUsernameSuccess",
  resolve => (validation: FieldValidationResult) => resolve(validation)
);

export const validateUsernameFailure = createAction(
  "user.validateUsernameFailure",
  resolve => (error: Error) => resolve(error)
);

// validatePassword

export const validatePasswordPending = createAction("user.validatePasswordPending", resolve => () =>
  resolve()
);

export const validatePasswordSuccess = createAction(
  "user.validatePasswordSuccess",
  resolve => (validation: FieldValidationResult) => resolve(validation)
);

export const validatePasswordFailure = createAction(
  "user.validatePasswordFailure",
  resolve => (error: Error) => resolve(error)
);
