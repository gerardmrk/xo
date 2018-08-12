/**
 * async actions for the session state
 */
import API from "@client/api";
import sleep from "@client/utils/sleep";
import { AuthTokens } from "@client/store/session/models";
import * as actions from "@client/store/session/actions";
import { StoreState, StoreDispatcher, StoreAsyncAction } from "@client/store";

// prettier-ignore
export const login = (
  usernameOrEmail: string,
  password: string,
  remember: boolean
): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.loginPending({
    showLoader: "progress.logging_in"
  }));

  try {
    const authTokens: AuthTokens = await api.auth.authenticate(
      usernameOrEmail,
      password,
      remember
    );

    api.auth.cacheLocalSession(authTokens);

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
export const logout = (): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(actions.logoutPending({
    showLoader: "progress.logging_out"
  }));

  try {
    await sleep(1000);

    dispatch(actions.logoutSuccess({
      showLoader: false
    }));
  } catch (err) {
    dispatch(actions.logoutFailure(<Error>err, {
      showLoader: false
    }));
  }
};
