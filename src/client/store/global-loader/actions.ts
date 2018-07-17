/**
 * action types for the global-loader state
 */

// tslint:disable:typedef

import { createAction } from "typesafe-actions";

// prettier-ignore
// show the global loading display
// optionally display a message with it
export const show = createAction(
  "ui.globalLoader.show",
  resolve => (loadingMessage?: string) => resolve(loadingMessage)
);

// prettier-ignore
// hide the global loading display
export const hide = createAction("ui.globalLoader.hide");
