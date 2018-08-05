// tslint:disable:typedef
import * as React from "react";
import { Subtract } from "utility-types";

import SettingsContext, { Settings } from "@client/views/contexts/SettingsContext";

export interface InjectedSettingsProps {
  settings: Settings;
}

// prettier-ignore
export const withSettings = <WrappedProps extends InjectedSettingsProps>(WrappedComponent: React.ComponentType<WrappedProps>) => {
  type HocProps = Subtract<WrappedProps, InjectedSettingsProps> & {};

  type HocState = {};

  return class WithSettings extends React.Component<HocProps, HocState> {
    public static displayName = `withSettings(${WrappedComponent.name})`;
    public static readonly WrappedComponent = WrappedComponent;

    public renderWithSettings = (settings: Settings): JSX.Element => (
      <WrappedComponent {...this.props} settings={settings} />
    )

    public render(): JSX.Element {
      return (
        <SettingsContext.Consumer>
          {this.renderWithSettings}
        </SettingsContext.Consumer>
      );
    }
  };
};

export default withSettings;
