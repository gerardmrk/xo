import { createAction } from "typesafe-actions";
import { TEST_ACTION } from "@client/store/global-loader/actions";

export { TEST_ACTION };

export const updatesAvailable = createAction("appStatuses.updatesAvailable");

export const updatesApplied = createAction("appStatuses.updatesApplied");
