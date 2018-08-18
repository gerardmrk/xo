/**
 * user state
 */
import { Reducer } from "redux";
import { set } from "unchanged";
import { DeepReadonly } from "utility-types";
import { getType, ActionType, StateType } from "typesafe-actions";

import AppTypes from "AppTypes";
import * as actions from "@client/store/user/actions";
import * as asyncActions from "@client/store/user/async-actions";

type Action = ActionType<typeof actions>;

type State = DeepReadonly<{ settings: AppTypes.UserModels.Settings | undefined }>;

const defaultState = {
  settings: undefined
};

const reducer: Reducer<State, Action> = (state = defaultState, action) => {
  switch (action.type) {
    case getType(actions.getSettingsSuccess):
      return set("settings", action.payload, state);

    case getType(actions.getSettingsPending):
    case getType(actions.getSettingsFailure):
    case getType(actions.registerPending):
    case getType(actions.registerSuccess):
    case getType(actions.registerFailure):
    case getType(actions.changePasswordPending):
    case getType(actions.changePasswordSuccess):
    case getType(actions.changePasswordFailure):
    case getType(actions.requestPasswordResetPending):
    case getType(actions.requestPasswordResetSuccess):
    case getType(actions.requestPasswordResetFailure):
    case getType(actions.resetPasswordPending):
    case getType(actions.resetPasswordSuccess):
    case getType(actions.resetPasswordFailure):
    case getType(actions.verifyCodePending):
    case getType(actions.verifyCodeSuccess):
    case getType(actions.verifyCodeFailure):
    case getType(actions.checkUsernameUniquenessPending):
    case getType(actions.checkUsernameUniquenessSuccess):
    case getType(actions.checkUsernameUniquenessFailure):
    default:
      return state;
  }
};

export { reducer as userReducer };
export { actions as userActions };
export { asyncActions as userAsyncActions };
export type UserAction = Action;
export type UserState = StateType<typeof reducer>;
