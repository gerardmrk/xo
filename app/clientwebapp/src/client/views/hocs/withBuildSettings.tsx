// tslint:disable:typedef
import * as React from "react";
import { Subtract } from "utility-types";

import BuildSettingsContext, { BuildSettings } from "@client/contexts/BuildSettingsContext";

export interface InjectedBuildSettingsProps {
  buildSettings: BuildSettings;
}

// prettier-ignore
export const withBuildSettings = <WrappedProps extends InjectedBuildSettingsProps>(WrappedComponent: React.ComponentType<WrappedProps>) => {
  type HocProps = Subtract<WrappedProps, InjectedBuildSettingsProps> & {};

  type HocState = {};

  return class WithBuildSettings extends React.Component<HocProps, HocState> {
    public static displayName = `withBuildSettings(${WrappedComponent.name})`;
    // reference to original wrapped component
    public static readonly WrappedComponent = WrappedComponent;

    // prettier-ignore
    public renderWithBuildSettings = (settings: BuildSettings): JSX.Element => (
      <WrappedComponent {...this.props} buildSettings={settings} />
    )

    public render(): JSX.Element {
      return (
        <BuildSettingsContext.Consumer>
          {this.renderWithBuildSettings}
        </BuildSettingsContext.Consumer>
      );
    }
  };
};

export default withBuildSettings;
