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

export interface BuildSettings {
  readonly devMode: boolean;
  readonly enableDevTools: boolean;
  readonly enableDebugger: boolean;
  readonly enableSourceMaps: boolean;
}

export interface Settings {
  appSettings: AppSettings;
  buildSettings: BuildSettings;
}

export const SettingsContext: React.Context<Settings> = React.createContext<Settings>({
  appSettings: {
    name: "",
    description: "",
    browsers: [],
    urls: {
      development: "",
      staging: "",
      production: ""
    }
  },
  buildSettings: {
    devMode: false,
    enableDevTools: false,
    enableDebugger: false,
    enableSourceMaps: false
  }
});

export default SettingsContext;
