import { createAction } from "typesafe-actions";

export const updatesAvailable = createAction("appStatuses.updatesAvailable");

export const updatesApplied = createAction("appStatuses.updatesApplied");
