/**
 * action types for the user state
 */
import { createAsyncAction } from "typesafe-actions";

import * as models from "@client/store/user/models";

// tslint:disable-next-line: typedef
export const getUserAsync = createAsyncAction(
  "user.get_user_request",
  "user.get_user_success",
  "user.get_user_failure"
)<void, models.User, Error>();
