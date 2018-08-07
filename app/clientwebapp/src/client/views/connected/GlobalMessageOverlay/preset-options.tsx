// import * as React from "react";

import RefreshPageForNewUpdatesMessage from "./presets/RefreshPageForNewUpdatesMessage";

export interface MessagePresets {
  REFRESH_PAGE_FOR_NEW_UPDATES: typeof RefreshPageForNewUpdatesMessage;
}

export const presets = {
  REFRESH_PAGE_FOR_NEW_UPDATES: RefreshPageForNewUpdatesMessage
};

export default presets;
