import { createAction } from "typesafe-actions";

export { TEST_ACTION } from "@client/utils/test-helpers/test-action";

export const updatesAvailable = createAction("appStatuses.updatesAvailable");

export const updatesApplied = createAction("appStatuses.updatesApplied");
