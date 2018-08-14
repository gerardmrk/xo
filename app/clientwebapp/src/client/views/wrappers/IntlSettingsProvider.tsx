/**
 * IntlSettingsProvider initializes the intl context
 * and provides it a store and some setter methods.
 */
// tslint:disable:no-unsafe-any
import * as React from "react";
import { addLocaleData, Locale } from "react-intl";

import * as defaultLocaleData from "react-intl/locale-data/en";
import defaultTranslations from "@translations/en.json";
import flattenTranslations from "@client/utils/flatten-translations";
import deriveLangFromLocale from "@client/utils/derive-lang-from-locale";
import IntlSettingsContext, { IntlSettings } from "@client/views/contexts/IntlSettingsContext";

export interface Props {
  settings: typeof INJECTED_INTL_SETTINGS;
}

export interface State extends IntlSettings {}

const defaultMessages: Messages = flattenTranslations(defaultTranslations as object);

export class IntlSettingsProvider extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      ...this.props.settings,
      locale: this.props.settings.defaultLanguage,
      messages: defaultMessages,
      setLocale: this.onLocaleChange
    };

    addLocaleData(defaultLocaleData);
  }

  // prettier-ignore
  private onLocaleChange = async (locale: string): Promise<void> => {
    const lang: string = deriveLangFromLocale(locale);
    const rawTranslations: object = (await import(/* webpackChunkName: "i18n/messages-" */ `@translations/${lang}.json`)) as object;
    const localeData: Locale = (await import(/* webpackChunkName: "i18n/locale-data-" */ `react-intl/locale-data/${lang}`)).default;
    addLocaleData(localeData);
    this.setState({
      messages: flattenTranslations(rawTranslations),
      locale
    });
  };

  public render(): React.ReactNode {
    return (
      <IntlSettingsContext.Provider value={this.state}>
        {this.props.children}
      </IntlSettingsContext.Provider>
    );
  }
}

export default IntlSettingsProvider;
