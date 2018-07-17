/**
 * This provides build settings to any components
 * that can access the context
 */
import * as React from "react";

import BuildSettingsContext from "@client/contexts/BuildSettingsContext";

export interface Props {
  settings: typeof INJECTED_BUILD_SETTINGS;
}

export type State = {};

export class BuildSettingsProvider extends React.PureComponent<Props, State> {
  public render(): JSX.Element | null {
    return (
      <BuildSettingsContext.Provider value={this.props.settings}>
        {this.props.children}
      </BuildSettingsContext.Provider>
    );
  }
}

export default BuildSettingsProvider;
