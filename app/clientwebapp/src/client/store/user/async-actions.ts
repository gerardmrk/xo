/**
 * async actions for the user state
 */
// tslint:disable: typedef
import API from "@client/api";
import * as actions from "@client/store/user/actions";
import { StoreState, StoreDispatcher, StoreAsyncAction } from "@client/store";
import { UserSettings, VerificationScope, RegistrationPayload } from "@client/store/user/models";
import { FieldValidationResult } from "@client/utils/local-validators";

// prettier-ignore
export const getSettings = (): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.getSettingsPending({ showLoader: 'progress.fetching_settings' }));

  try {
    const settings: UserSettings = await api.user.getSettings();
    dispatch(actions.getSettingsSuccess(settings, { showLoader: false }));
  } catch (error) {
    dispatch(actions.getSettingsFailure(<Error>error, { showLoader: false }));
  }
};

// prettier-ignore
export const register = (formObject: RegistrationPayload): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.registerPending({ showLoader: true }));

  try {
    await api.user.register(formObject);
    
    dispatch(actions.registerSuccess({ showLoader: false }));
  } catch (error) {
    dispatch(actions.registerFailure(<Error>error, { showLoader: false }));
  }
};

// prettier-ignore
export const changePassword = (oldPassword: string, newPassword: string): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.changePasswordPending({ showLoader: true }));

  try {
    await api.user.changePassword(oldPassword, newPassword);
    
    dispatch(actions.changePasswordSuccess({ showLoader: false }));
  } catch (error) {
    dispatch(actions.changePasswordFailure(<Error>error, { showLoader: false }));
  }
};

// prettier-ignore
export const requestPasswordReset = (usernameOrEmail: string, callback: (success: boolean) => void): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.requestPasswordResetPending({ showLoader: true }));

  try {
    await api.user.requestPasswordReset(usernameOrEmail);
    
    dispatch(actions.requestPasswordResetSuccess({ showLoader: false }));
    callback(true);
  } catch (error) {
    dispatch(actions.requestPasswordResetFailure(<Error>error, { showLoader: false }));
    callback(false);
  }
};

// prettier-ignore
export const resetPassword = (newPassword: string): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.resetPasswordPending({ showLoader: true }));

  try {
    await api.user.resetPassword(newPassword);
    
    dispatch(actions.resetPasswordSuccess({ showLoader: false }));
  } catch (error) {
    dispatch(actions.resetPasswordFailure(<Error>error, { showLoader: false }));
  }
};

// prettier-ignore
export const verifyCode = (code: string, scope: VerificationScope, callback: (err?: Error) => void): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.verifyCodePending({ showLoader: true }));

  try {
    await api.user.verifyCode(code, scope);
    dispatch(actions.verifyCodeSuccess(code, { showLoader: false }));
    callback();
  } catch (error) {
    dispatch(actions.verifyCodeFailure(<Error>error, { showLoader: false }));
    callback(<Error>error);
  }
}

// prettier-ignore
export const validateEmail = (email: string, callback: (validation: FieldValidationResult) => void): StoreAsyncAction => async(dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.validateEmailPending());  

  let validation: FieldValidationResult = {
    valid: false
  };

  try {
    validation = await api.user.validateEmail(email);
    dispatch(actions.validateEmailSuccess(validation));
  } catch (error) {
    dispatch(actions.validateEmailFailure(<Error>error));
  } finally {
    callback(validation);
  }
}

// prettier-ignore
export const validateUsername = (username: string, callback: (validation: FieldValidationResult) => void): StoreAsyncAction => async(dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.validateUsernamePending());  

  let validation: FieldValidationResult = {
    valid: false
  };

  try {
    validation = await api.user.validateUsername(username);
    dispatch(actions.validateUsernameSuccess(validation));
  } catch (error) {
    dispatch(actions.validateUsernameFailure(<Error>error));
  } finally {
    callback(validation);
  }
}

// prettier-ignore
export const validatePassword = (password: string, callback: (validation: FieldValidationResult) => void): StoreAsyncAction => async(dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.validatePasswordPending());  

  let validation: FieldValidationResult = {
    valid: false
  };

  try {
    validation = await api.user.validatePassword(password);
    dispatch(actions.validatePasswordSuccess(validation));
  } catch (error) {
    dispatch(actions.validatePasswordFailure(<Error>error));
  } finally {
    callback(validation);
  }
}
