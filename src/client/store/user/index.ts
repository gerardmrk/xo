/**
 * user state
 */
import { Reducer } from "redux";
import { DeepReadonly } from "utility-types";
import { ActionType, getType } from "typesafe-actions";

import * as models from "@client/store/user/models";
import * as actions from "@client/store/user/actions";

export type Action = ActionType<typeof actions>;
export type State = DeepReadonly<{} & models.User>;

const defaultState: State = {
  username: undefined,
  email: undefined,
  mobile: undefined,
  description: undefined,
  profilePicURL: undefined,
  bannerPicURL: undefined
};

const user: Reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case getType(actions.getUserAsync.request):
      return state;

    // update user state with the full user profile
    case getType(actions.getUserAsync.success):
      return { ...state, ...action.payload };

    case getType(actions.getUserAsync.failure):
      return state;

    default:
      return state;
  }
};

export default user;
