/**
 * async actions for the session state
 */
import API from "@client/api";
import AppTypes from "AppTypes";
import * as actions from "@client/store/session/actions";

// prettier-ignore
export const login = (usernameOrEmail: string, password: string, remember: boolean) => async (dispatch: AppTypes.Store.Dispatcher, getState: () => AppTypes.Store.State, api: API) => {
  dispatch(actions.loginPending({
    showLoader: "progress.logging_in"
  }));

  try {
    const authTokens = await api.auth.authenticate(
      usernameOrEmail,
      password,
      remember
    );

    // api.auth.cacheLocalSession(authTokens);

    dispatch(actions.loginSuccess(authTokens, {
      showLoader: false
    }));
  } catch (err) {
    dispatch(actions.loginFailure(<Error>err, {
      showLoader: false
    }));
  }
};

// prettier-ignore
export const logout = () => async (dispatch: AppTypes.Store.Dispatcher, getState: () => AppTypes.Store.State, api: API) => {
  dispatch(actions.logoutPending({
    showLoader: "progress.logging_out"
  }));

  try {
    await api.auth.unauthenticate();

    dispatch(actions.logoutSuccess({
      showLoader: false
    }));
  } catch (err) {
    dispatch(actions.logoutFailure(<Error>err, {
      showLoader: false
    }));
  }
};
