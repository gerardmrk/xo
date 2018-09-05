/**
 * Message state
 * only responsible for one thing:
 * to show or hide the global message overlay
 */
import { Reducer } from "redux";
import { set } from "unchanged";
import { DeepReadonly } from "utility-types";
import { getType, ActionType, StateType } from "typesafe-actions";

import AppTypes from "AppTypes";
import * as actions from "@client/store/global-message/actions";

type Action = ActionType<typeof actions>;

type State = DeepReadonly<{
  message: AppTypes.GlobalMessage;
}>;

const defaultState: State = {
  message: undefined
};

const reducer: Reducer<State, Action> = (state = defaultState, action) => {
  switch (action.type) {
    case getType(actions.show):
      return set("message", action.payload, state);

    case getType(actions.hide):
      return defaultState;

    default:
      return state;
  }
};

export { reducer as globalMessageReducer };
export { actions as globalMessageActions };
export type GlobalMessageAction = Action;
export type GlobalMessageState = StateType<typeof reducer>;
