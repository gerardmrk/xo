/**
 * Message state
 * only responsible for one thing:
 * to show or hide the global message overlay
 */
// tslint:disable:no-unsafe-any
import { Reducer } from "redux";
import { DeepReadonly } from "utility-types";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "@client/store/global-message/actions";
import { SemanticCOLORS } from "semantic-ui-react";

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<{
  message?: string;
  color?: SemanticCOLORS;
}>;

const defaultState: State = {
  message: undefined,
  color: undefined
};

// prettier-ignore
const globalMessage: Reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case getType(actions.show):
      return {
        ...state,
        message: action.payload.message,
        color: action.payload.color
      };

    case getType(actions.hide):
      return defaultState;

    default:
      return state;
  }
};

export default globalMessage;
