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
    intl: {
      defaultLanguage: "en",
      supportedLanguages: []
    }
  },
  buildSettings: {
    url: "",
    targets: { node: "current", browsers: [""] },
    enableDevtools: false,
    enableDebugger: false,
    enableSourcemaps: false
  }
});

// prettier-ignore
export class SettingsProvider extends React.PureComponent<{
  appSettings: typeof INJECTED_SETTINGS.app;
  buildSettings: typeof INJECTED_SETTINGS.build;
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
