/**
 * action types for the global-message state
 */

// tslint:disable:typedef
import { createAction } from "typesafe-actions";

import * as models from "@client/store/global-message/models";
import { TEST_ACTION } from "@client/store/global-loader/actions";

export { TEST_ACTION };

export const show = createAction("globalMessage.show", resolve => (message: models.GlobalMessage) =>
  resolve(message)
);

export const hide = createAction("globalMessage.hide");
