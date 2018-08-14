/**
 * Message state
 * only responsible for one thing:
 * to show or hide the global message overlay
 */
// tslint:disable:no-unsafe-any
import { set } from "unchanged";
import { ActionType, getType } from "typesafe-actions";

import * as models from "@client/store/global-message/models";
import * as actions from "@client/store/global-message/actions";

export type Action = ActionType<typeof actions>;

export type State = {
  message: models.GlobalMessage;
};

const defaultState: State = {
  message: undefined
};

export const reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case getType(actions.show):
      return set("message", action.payload, state);

    case getType(actions.hide):
      return defaultState;

    default:
      return state;
  }
};

export { actions };
export { models };
