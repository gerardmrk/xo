import * as React from "react";
import { Subtract } from "utility-types";

import { I18nContext, I18n } from "@client/views/contexts/I18nContext";

export interface InjectedIntlSettingsProps {
  intlSettings: I18n;
}

// prettier-ignore
export const withIntlSettings = <WrappedProps extends InjectedIntlSettingsProps>(WrappedComponent: React.ComponentType<WrappedProps>) => {
  type HocProps = Subtract<WrappedProps, InjectedIntlSettingsProps> & {};

  type HocState = {};

  return class WithIntlSettings extends React.Component<HocProps, HocState> {
    public static displayName = `withIntlSettings(${WrappedComponent.name})`;

    public static readonly WrappedComponent = WrappedComponent;

    public renderWithIntlSettings = (settings: I18n): JSX.Element => (
      <WrappedComponent {...this.props} intlSettings={settings} />
    )

    public render(): JSX.Element {
      return (
        <I18nContext.Consumer>
          {this.renderWithIntlSettings}
        </I18nContext.Consumer>
      );
    }
  };
};

export default withIntlSettings;
