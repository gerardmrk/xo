/**
 * async actions for the user state
 */
// tslint:disable: typedef
import API from "@client/api";
import AppTypes from "AppTypes";
import * as actions from "@client/store/user/actions";

// prettier-ignore
export const getSettings = () => async (dispatch: AppTypes.Store.Dispatcher, getState: () => AppTypes.Store.State, api: API): Promise<void> => {
  dispatch(actions.getSettingsPending({ showLoader: 'progress.fetching_settings' }));

  try {
    const settings: AppTypes.UserModels.Settings = await api.user.getSettings();
    dispatch(actions.getSettingsSuccess(settings, { showLoader: false }));
  } catch (error) {
    dispatch(actions.getSettingsFailure(<Error>error, { showLoader: false }));
  }
};

// prettier-ignore
export const register = (formObject: AppTypes.UserModels.RegistrationPayload, callback: ErrorFirstCallback) => async (dispatch: AppTypes.Store.Dispatcher, getState: () => AppTypes.Store.State, api: API): Promise<void> => {
  dispatch(actions.registerPending({ showLoader: true }));

  try {
    await api.user.register(formObject);
    
    dispatch(actions.registerSuccess({ showLoader: false }));
    callback(null);
  } catch (error) {
    dispatch(actions.registerFailure(<Error>error, { showLoader: false }));
    callback(<Error>error);
  }
};

// prettier-ignore
export const changePassword = (oldPassword: string, newPassword: string) => async (dispatch: AppTypes.Store.Dispatcher, getState: () => AppTypes.Store.State, api: API): Promise<void> => {
  dispatch(actions.changePasswordPending({ showLoader: true }));

  try {
    await api.user.changePassword(oldPassword, newPassword);
    
    dispatch(actions.changePasswordSuccess({ showLoader: false }));
  } catch (error) {
    dispatch(actions.changePasswordFailure(<Error>error, { showLoader: false }));
  }
};

// prettier-ignore
export const requestPasswordReset = (usernameOrEmail: string, callback: ErrorFirstCallback) => async (dispatch: AppTypes.Store.Dispatcher, getState: () => AppTypes.Store.State, api: API): Promise<void> => {
  dispatch(actions.requestPasswordResetPending({ showLoader: true }));

  try {
    await api.user.requestPasswordReset(usernameOrEmail);
    
    dispatch(actions.requestPasswordResetSuccess({ showLoader: false }));
    callback(null);
  } catch (error) {
    dispatch(actions.requestPasswordResetFailure(<Error>error, { showLoader: false }));
    callback(<Error>error);
  }
};

// prettier-ignore
export const resetPassword = (newPassword: string, callback: ErrorFirstCallback) => async (dispatch: AppTypes.Store.Dispatcher, getState: () => AppTypes.Store.State, api: API): Promise<void> => {
  dispatch(actions.resetPasswordPending({ showLoader: true }));

  try {
    await api.user.resetPassword(newPassword);
    
    dispatch(actions.resetPasswordSuccess({ showLoader: false }));
    callback(null);
  } catch (error) {
    dispatch(actions.resetPasswordFailure(<Error>error, { showLoader: false }));
    callback(<Error>error);
  }
};

// prettier-ignore
export const verifyCode = (code: string, scope: AppTypes.UserModels.VerificationScope, callback: ErrorFirstCallback) => async (dispatch: AppTypes.Store.Dispatcher, getState: () => AppTypes.Store.State, api: API): Promise<void> => {
  dispatch(actions.verifyCodePending({ showLoader: true }));

  try {
    await api.user.verifyCode(code, scope);
    dispatch(actions.verifyCodeSuccess({ showLoader: false }));
    callback(null);
  } catch (error) {
    dispatch(actions.verifyCodeFailure(<Error>error, { showLoader: false }));
    callback(<Error>error);
  }
}

// prettier-ignore
export const checkUsernameUniqueness = (username: string, callback: ErrorFirstCallback<boolean>) => async(dispatch: AppTypes.Store.Dispatcher, getState: () => AppTypes.Store.State, api: API): Promise<void> => {
  dispatch(actions.checkUsernameUniquenessPending());  

  try {
    const isUnique = await api.user.checkUsernameUniqueness(username);
    dispatch(actions.checkUsernameUniquenessSuccess(isUnique));
    callback(null, isUnique);
  } catch (error) {
    dispatch(actions.checkUsernameUniquenessFailure(<Error>error));
    callback(<Error>error);
  }
}
