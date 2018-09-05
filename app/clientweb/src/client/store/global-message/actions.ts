/**
 * action types for the global-message state
 */

// tslint:disable:typedef
import { createAction } from "typesafe-actions";

import AppTypes from "AppTypes";

export { TEST_ACTION } from "@client/utils/test-helpers/test-action";

export const show = createAction(
  "globalMessage.show",
  resolve => (message: AppTypes.GlobalMessage) => resolve(message)
);

export const hide = createAction("globalMessage.hide");
