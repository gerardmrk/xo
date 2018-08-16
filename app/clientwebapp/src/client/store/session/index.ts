/**
 * Session state
 */
import { set, merge } from "unchanged";
import { DeepReadonly } from "utility-types";
import { getType, ActionType, StateType } from "typesafe-actions";

import AppTypes from "AppTypes";
import * as actions from "@client/store/session/actions";
import * as asyncActions from "@client/store/session/async-actions";

type Action = ActionType<typeof actions>;

type State = DeepReadonly<{
  authenticated: boolean;
  authenticating: boolean;
  authTokens: AppTypes.AuthModels.AuthTokens | undefined;
}>;

const defaultState: State = {
  authenticated: false,
  authenticating: false,
  authTokens: undefined
};

// prettier-ignore
const reducer = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case getType(actions.loginPending):
      return <State>(set("authenticating", true, state));

    case getType(actions.loginSuccess):
      return <State>(merge(null, {
          authenticating: false,
          authenticated: true,
          authTokens: action.payload
      }, state));

    case getType(actions.loginFailure):
      return <State>(merge(null, {
        authenticating: false,
        authenticated: false,
        authTokens: undefined
      }, state));

    case getType(actions.logoutPending):
      return state;

    case getType(actions.logoutFailure):
      return state;

    case getType(actions.logoutSuccess):
      return <State>(merge(null, {
        authenticated: false,
        authTokens: undefined
      }, state));

    default:
      return state;
  }
};

export { reducer as sessionReducer };
export { actions as sessionActions };
export { asyncActions as sessionAsyncActions };
export type SessionAction = Action;
export type SessionState = StateType<typeof reducer>;
