import { ActionType, getType } from "typesafe-actions";

import * as actions from "@client/store/app-statuses/actions";

export type Action = ActionType<typeof actions>;

export type State = {
  updated: boolean;
};

const defaultState: State = {
  updated: true
};

const appStatuses = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case getType(actions.updatesAvailable):
      return { updated: false };

    case getType(actions.updatesApplied):
      return { updated: true };

    default:
      return state;
  }
};

export default appStatuses;
