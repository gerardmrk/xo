/**
 * user state
 */
// tslint:disable:typedef no-unsafe-any

import { Reducer } from "redux";
import { DeepReadonly } from "utility-types";
import { ActionType, getType } from "typesafe-actions";
import { set } from "unchanged";

import * as models from "@client/store/user/models";
import * as actions from "@client/store/user/actions";

export type Action = ActionType<typeof actions>;
export type State = DeepReadonly<{ settings?: models.UserSettings }>;

const defaultState: State = {
  settings: undefined
};

const user: Reducer = (state: State = defaultState, action: Action): State => {
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
    case getType(actions.validateEmailPending):
    case getType(actions.validateEmailSuccess):
    case getType(actions.validateEmailFailure):
    case getType(actions.validateUsernamePending):
    case getType(actions.validateUsernameSuccess):
    case getType(actions.validateUsernameFailure):
    case getType(actions.validatePasswordPending):
    case getType(actions.validatePasswordSuccess):
    case getType(actions.validatePasswordFailure):
    default:
      return state;
  }
};

export default user;
