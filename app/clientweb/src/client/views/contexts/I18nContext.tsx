/**
 * React context for internationalization
 *
 * provides locale setting and translations to all components
 *
 * this is in its own context rather than in the store state
 * to prevent bloating up the state which will lead to performance issues.
 */
/**
 * IntlSettingsProvider initializes the intl context
 * and provides it a store and some setter methods.
 */
// tslint:disable:no-unsafe-any
import * as React from "react";
import * as defaultLocaleData from "react-intl/locale-data/en";
import {
  addLocaleData,
  Locale,
  IntlProvider as BaseIntlProvider
} from "react-intl";

import defaultTranslations from "@translations/en.json";
import withSettings from "@client/views/wrappers/withSettings";
import flattenTranslations from "@client/utils/flatten-translations";
import deriveLangFromLocale from "@client/utils/derive-lang-from-locale";

const defaultMessages = flattenTranslations(defaultTranslations);

export interface I18n {
  readonly locale: string;
  readonly messages: { [k: string]: string };
  readonly defaultLanguage: string;
  readonly supportedLanguages: string[];
  setLocale(locale: string): Promise<void>;
}

export const I18nContext: React.Context<I18n> = React.createContext<I18n>({
  locale: "en",
  messages: {},
  defaultLanguage: "en",
  supportedLanguages: [],
  setLocale: async (locale: string): Promise<void> => {}
});

class IntlProvider extends React.Component {
  private renderBaseIntlProvider = ({
    locale,
    messages
  }: I18n): JSX.Element => (
    <BaseIntlProvider key={locale} locale={locale} messages={messages}>
      {this.props.children}
    </BaseIntlProvider>
  );

  public render(): React.ReactNode {
    return (
      <I18nContext.Consumer>{this.renderBaseIntlProvider}</I18nContext.Consumer>
    );
  }
}

// ----
export type I18nProviderProps = { settings: typeof INJECTED_SETTINGS } & {};

export class I18nProvider extends React.Component<I18nProviderProps, I18n> {
  // prettier-ignore
  public constructor(props: I18nProviderProps) {
    super(props);

    const { settings: { app: { intl } } } = props;
    this.state = {
      ...intl,
      locale: intl.defaultLanguage,
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
      <I18nContext.Provider value={this.state}>
        <IntlProvider>{this.props.children}</IntlProvider>
      </I18nContext.Provider>
    );
  }
}

export default withSettings(I18nProvider);
