import * as React from "react";

export const SettingsContext: React.Context<typeof INJECTED_SETTINGS> = React.createContext({
  app: {
    name: "",
    description: "",
    intl: {
      defaultLanguage: "en",
      supportedLanguages: ["en"]
    }
  },
  build: {
    url: "",
    targets: { node: "current", browsers: [""] },
    enableDevtools: false,
    enableDebugger: false,
    enableSourcemaps: false
  },
  services: { auth: {}, identity: {}, geolocation: {}, incidents: {} }
});

export type I18nProviderProps = {
  settings: typeof INJECTED_SETTINGS;
};

export class SettingsProvider extends React.PureComponent<I18nProviderProps> {
  public render(): React.ReactNode {
    return (
      <SettingsContext.Provider value={this.props.settings}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}

export default SettingsContext;
