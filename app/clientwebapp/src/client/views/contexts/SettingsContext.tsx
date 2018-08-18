import * as React from "react";

import AppTypes from "AppTypes";

export interface Settings {
  appSettings: AppTypes.Injected.AppSettings;
  buildSettings: AppTypes.Injected.BuildSettings;
}

export const SettingsContext: React.Context<Settings> = React.createContext<Settings>({
  appSettings: {
    name: "",
    description: "",
    supportedBrowsers: [],
    supportedLanguages: [],
    appURL: { development: "", staging: "", production: "" },
    sitemap: {}
  },
  buildSettings: {
    devMode: false,
    enableDevTools: false,
    enableDebugger: false,
    enableSourcemaps: false
  }
});

// prettier-ignore
export class SettingsProvider extends React.PureComponent<{
  appSettings: typeof INJECTED_APP_SETTINGS;
  buildSettings: typeof INJECTED_BUILD_SETTINGS;
}> {
  public render(): React.ReactNode {
    return (
      <SettingsContext.Provider value={this.props}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}

export default SettingsContext;
