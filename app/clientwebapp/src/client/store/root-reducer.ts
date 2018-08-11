/**
 * the root reducer
 * in non-redux-specific terms:
 * the combined store state
 */
import { combineReducers } from "redux";

import user, { State as UserState, Action as UserAction } from "@client/store/user";

import session, { State as SessionState, Action as SessionAction } from "@client/store/session";

import globalLoader, {
  State as GlobalLoaderState,
  Action as GlobalLoaderAction
} from "@client/store/global-loader";

import globalMessage, {
  State as GlobalMessageState,
  Action as GlobalMessageAction
} from "@client/store/global-message";

import appStatuses, {
  State as AppStatusesState,
  Action as AppStatusesAction
} from "@client/store/app-statuses";

export type RootState = {
  user: UserState;
  session: SessionState;
  globalLoader: GlobalLoaderState;
  globalMessage: GlobalMessageState;
  appStatuses: AppStatusesState;
};

export type RootAction =
  | UserAction
  | SessionAction
  | GlobalLoaderAction
  | GlobalMessageAction
  | AppStatusesAction;

export default combineReducers<RootState, RootAction>({
  user,
  session,
  globalLoader,
  globalMessage,
  appStatuses
});
