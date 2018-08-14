/**
 * This provides app settings to any components
 * that can access the context
 */
import * as React from "react";

import SettingsContext from "@client/views/contexts/SettingsContext";

export interface Props {
  appSettings: typeof INJECTED_APP_SETTINGS;
  buildSettings: typeof INJECTED_BUILD_SETTINGS;
}

export type State = {};

export class SettingsProvider extends React.PureComponent<Props, State> {
  public render(): React.ReactNode {
    return (
      <SettingsContext.Provider value={this.props}>{this.props.children}</SettingsContext.Provider>
    );
  }
}

export default SettingsProvider;
