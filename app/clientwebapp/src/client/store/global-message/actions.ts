/**
 * action types for the global-message state
 */

// tslint:disable:typedef
import { createAction } from "typesafe-actions";

import * as models from "@client/store/global-message/models";

export const show = createAction(
  "ui.globalMessage.show",
  resolve => (message: models.GlobalMessage) => resolve(message)
);

export const hide = createAction("ui.globalMessage.hide");
