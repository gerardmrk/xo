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
  readonly urls: {
    readonly [stage: string]: string;
    readonly development: string;
    readonly staging: string;
    readonly production: string;
  };
}

export const AppSettingsContext: React.Context<AppSettings> = React.createContext<AppSettings>({
  name: "",
  description: "",
  browsers: [],
  urls: {
    development: "",
    staging: "",
    production: ""
  }
});

export default AppSettingsContext;
