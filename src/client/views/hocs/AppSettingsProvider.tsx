/**
 * This provides app settings to any components
 * that can access the context
 */
import * as React from "react";

import AppSettingsContext from "@client/contexts/AppSettingsContext";

export interface Props {
  settings: typeof INJECTED_APP_SETTINGS;
}

export type State = {};

export class AppSettingsProvider extends React.PureComponent<Props, State> {
  public render(): JSX.Element | null {
    return (
      <AppSettingsContext.Provider value={this.props.settings}>
        {this.props.children}
      </AppSettingsContext.Provider>
    );
  }
}

export default AppSettingsProvider;
