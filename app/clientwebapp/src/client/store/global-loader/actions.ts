/**
 * action types for the global-loader state
 */

// tslint:disable:typedef

import { createAction } from "typesafe-actions";

export { TEST_ACTION } from "@client/utils/test-helpers/test-action";

// show the global loading display
// optionally display a message with it
export const show = createAction("globalLoader.show", resolve => (loadingMessage?: string) =>
  resolve(loadingMessage)
);

// hide the global loading display
export const hide = createAction("globalLoader.hide");
