/**
 * action types for the global-message state
 */

// tslint:disable:typedef
import { createAction } from "typesafe-actions";

import { GlobalMessage } from "@client/store/global-message/models";

export const show = createAction(
  "ui.globalMessage.show",
  resolve => (msg: GlobalMessage) => resolve(msg)
);

export const hide = createAction("ui.globalMessage.hide");
