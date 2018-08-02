// tslint:disable:typedef
import * as React from "react";
import { Subtract } from "utility-types";

import IntlContext, { IntlSettings } from "@client/views/contexts/IntlSettingsContext";

export interface InjectedIntlSettingsProps {
  intlSettings: IntlSettings;
}

// prettier-ignore
export const withIntlSettings = <WrappedProps extends InjectedIntlSettingsProps>(WrappedComponent: React.ComponentType<WrappedProps>) => {
  type HocProps = Subtract<WrappedProps, InjectedIntlSettingsProps> & {};

  type HocState = {};

  return class WithIntlSettings extends React.Component<HocProps, HocState> {
    public static displayName = `withIntlSettings(${WrappedComponent.name})`;
    public static readonly WrappedComponent = WrappedComponent;

    public renderWithIntlSettings = (settings: IntlSettings): JSX.Element => (
      <WrappedComponent {...this.props} intlSettings={settings} />
    )

    public render(): JSX.Element {
      return (
        <IntlContext.Consumer>
          {this.renderWithIntlSettings}
        </IntlContext.Consumer>
      );
    }
  };
};

export default withIntlSettings;
