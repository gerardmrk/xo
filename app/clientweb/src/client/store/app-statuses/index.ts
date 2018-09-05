import { Reducer } from "redux";
import { DeepReadonly } from "utility-types";
import { getType, ActionType, StateType } from "typesafe-actions";

import * as actions from "@client/store/app-statuses/actions";

type Action = ActionType<typeof actions>;

type State = DeepReadonly<{
  updated: boolean;
}>;

const defaultState: State = {
  updated: true
};

const reducer: Reducer<State, Action> = (state = defaultState, action) => {
  switch (action.type) {
    case getType(actions.updatesAvailable):
      return { updated: false };

    case getType(actions.updatesApplied):
      return { updated: true };

    default:
      return state;
  }
};

export { reducer as appStatusesReducer };
export { actions as appStatusesActions };
export type AppStatusesAction = Action;
export type AppStatusesState = StateType<typeof reducer>;
