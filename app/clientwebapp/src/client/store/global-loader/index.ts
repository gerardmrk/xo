/**
 * Loading state
 * only responsible for one thing:
 * to toggle the global loading indicator ui
 */
import { DeepReadonly } from "utility-types";
import { getType, ActionType, StateType } from "typesafe-actions";

import * as actions from "@client/store/global-loader/actions";

type Action = ActionType<typeof actions>;

type State = DeepReadonly<{
  loading: boolean;
  message?: string;
}>;

const defaultState: State = {
  loading: false,
  message: undefined
};

const reducer = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case getType(actions.show):
      return {
        ...state,
        loading: true,
        message: action.payload
      };

    case getType(actions.hide):
      return defaultState;

    default:
      return state;
  }
};

export { reducer as globalLoaderReducer };
export { actions as globalLoaderActions };
export type GlobalLoaderAction = Action;
export type GlobalLoaderState = StateType<typeof reducer>;
