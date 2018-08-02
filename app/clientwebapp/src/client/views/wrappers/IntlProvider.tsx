/**
 * this wraps the original IntlProvider from 'react-intl'
 * with the intl context so the user is able to change the language
 * at will rather than having the language fixed at app load
 */
import * as React from "react";
import { IntlProvider as BaseIntlProvider } from "react-intl";

import IntlSettingsContext, { IntlSettings } from "@client/views/contexts/IntlSettingsContext";

export interface Props {}

export type State = {};

export class IntlProvider extends React.Component<Props, State> {
  // prettier-ignore
  private renderBaseIntlProvider = ({ locale, messages }: IntlSettings): JSX.Element => (
    <BaseIntlProvider key={locale} locale={locale} messages={messages}>
      {this.props.children}
    </BaseIntlProvider>
  );

  public render(): JSX.Element | null {
    return (
      <IntlSettingsContext.Consumer>{this.renderBaseIntlProvider}</IntlSettingsContext.Consumer>
    );
  }
}

export default IntlProvider;
