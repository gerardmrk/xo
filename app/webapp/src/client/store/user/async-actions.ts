/**
 * async actions for the user state
 */
// tslint:disable: typedef
import API from "@client/api";
import { UserSettings } from "@client/store/user/models";
import * as actions from "@client/store/user/actions";
import { StoreState, StoreDispatcher, StoreAsyncAction } from "@client/store";

// prettier-ignore
export const getSettings = (): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.getSettingsPending({
    showLoader: 'progress.fetching_settings'
  }));

  try {
    const settings: UserSettings = await api.user.getSettings();
    dispatch(actions.getSettingsSuccess(settings, {
      showLoader: false
    }));
  } catch (error) {
    dispatch(actions.getSettingsFailure(<Error>error, {
      showLoader: false
    }));
  }
};

// prettier-ignore
export const register = (): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.registerPending({
      showLoader: true
  }));

  try {
    await api.user.register();
    
    dispatch(actions.registerSuccess({
      showLoader: false
    }));
  } catch (error) {
    dispatch(actions.registerFailure(<Error>error, {
      showLoader: false
    }));
  }
};

// prettier-ignore
export const changePassword = (oldPassword: string, newPassword: string): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.changePasswordPending({
      showLoader: true
  }));

  try {
    await api.user.changePassword(oldPassword, newPassword);
    
    dispatch(actions.changePasswordSuccess({
      showLoader: false
    }));
  } catch (error) {
    dispatch(actions.changePasswordFailure(<Error>error, {
      showLoader: false
    }));
  }
};

// prettier-ignore
export const requestPasswordReset = (usernameOrEmail: string, callback: (success: boolean) => void): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.requestPasswordResetPending({
      showLoader: true
  }));

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
  dispatch(actions.resetPasswordPending({
      showLoader: true
  }));

  try {
    await api.user.resetPassword(newPassword);
    
    dispatch(actions.resetPasswordSuccess({
      showLoader: false
    }));
  } catch (error) {
    dispatch(actions.resetPasswordFailure(<Error>error, {
      showLoader: false
    }));
  }
};

// prettier-ignore
export const verifyToken = (token: string, tokenScope: string, callback: (err?: Error) => void): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.verifyTokenPending({
    showLoader: true
  }))

  try {
    await api.user.verifyToken(token, tokenScope);
    dispatch(actions.verifyTokenSuccess(token, {
      showLoader: false
    }));
    callback();
  } catch (error) {
    dispatch(actions.verifyTokenFailure(<Error>error, {
      showLoader: false
    }));
    callback(error);
  }
}
