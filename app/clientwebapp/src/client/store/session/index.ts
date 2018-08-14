/**
 * Session state
 */
// tslint:disable:no-unsafe-any
import { set, merge } from "unchanged";
import { DeepReadonly } from "utility-types";
import { ActionType, getType } from "typesafe-actions";

import * as models from "@client/store/session/models";
import * as actions from "@client/store/session/actions";
import * as asyncActions from "@client/store/session/async-actions";

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<{
  authenticated: boolean;
  authenticating: boolean;
  authTokens?: models.AuthTokens;
}>;

const defaultState: State = {
  authenticated: false,
  authenticating: false,
  authTokens: undefined
};

// prettier-ignore
export const reducer = (state: State = defaultState, action: Action): State => {
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

export { actions };
export { asyncActions };
export { models };
