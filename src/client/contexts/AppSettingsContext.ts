/**
 * React context for app settings
 *
 * provides app settings to all components
 */
import * as React from "react";

export interface AppSettings {
  readonly name: string;
  readonly description: string;
  readonly browsers: string[];
}

// prettier-ignore
export const AppSettingsContext: React.Context<AppSettings> = React.createContext<AppSettings>({
  name: "",
  description: "",
  browsers: [],
});

export default AppSettingsContext;
