/**
 * Loading state
 * only responsible for one thing:
 * to toggle the global loading indicator ui
 */
import { DeepReadonly } from "utility-types";
import { ActionType, getType } from "typesafe-actions";
import * as actions from "@client/store/global-loader/actions";

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<{
  loading: boolean;
  message?: string;
}>;

export const defaultState: State = {
  loading: false,
  message: undefined
};

export const reducer = (state: State = defaultState, action: Action): State => {
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

export { actions };
