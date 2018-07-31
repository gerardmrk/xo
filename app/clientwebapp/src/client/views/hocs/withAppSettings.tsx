// tslint:disable:typedef
import * as React from "react";
import { Subtract } from "utility-types";

import AppSetingsContext, { AppSettings } from "@client/contexts/AppSettingsContext";

export interface InjectedAppSettingsProps {
  appSettings: AppSettings;
}

// prettier-ignore
export const withAppSettings = <WrappedProps extends InjectedAppSettingsProps>(WrappedComponent: React.ComponentType<WrappedProps>) => {
  type HocProps = Subtract<WrappedProps, InjectedAppSettingsProps> & {};

  type HocState = {};

  return class WithAppSettings extends React.Component<HocProps, HocState> {
    public static displayName = `withAppSettings(${WrappedComponent.name})`;
    // reference to original wrapped component
    public static readonly WrappedComponent = WrappedComponent;

    // prettier-ignore
    public renderWithAppSettings = (settings: AppSettings): JSX.Element => (
      <WrappedComponent {...this.props} appSettings={settings} />
    )

    public render(): JSX.Element {
      return (
        <AppSetingsContext.Consumer>
          {this.renderWithAppSettings}
        </AppSetingsContext.Consumer>
      );
    }
  };
};

export default withAppSettings;
