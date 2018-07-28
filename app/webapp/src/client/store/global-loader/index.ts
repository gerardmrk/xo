/**
 * Loading state
 * only responsible for one thing:
 * to toggle the global loading indicator ui
 */
// tslint:disable:no-unsafe-any
import { Reducer } from "redux";
import { DeepReadonly } from "utility-types";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "@client/store/global-loader/actions";

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<{
  loading: boolean;
  message?: string;
}>;

const defaultState: State = {
  loading: false,
  message: undefined
};

// prettier-ignore
const globalLoader: Reducer = (state: State = defaultState, action: Action): State => {
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

export default globalLoader;
