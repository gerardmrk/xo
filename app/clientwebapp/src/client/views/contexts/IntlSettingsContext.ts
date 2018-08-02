/**
 * React context for internationalization
 *
 * provides locale setting and translations to all components
 *
 * this is in its own context rather than in the store state
 * to prevent bloating up the state which will lead to performance issues.
 */
import * as React from "react";

export interface IntlSettings {
  readonly locale: string;
  readonly messages: Messages;
  readonly defaultLanguage: string;
  readonly supportedLanguages: string[];
  setLocale(locale: string): Promise<void>;
}

export const IntlSettingsContext: React.Context<IntlSettings> = React.createContext<IntlSettings>({
  locale: "en",
  messages: {},
  defaultLanguage: "en",
  supportedLanguages: [],
  setLocale: async (locale: string): Promise<void> => {}
});

export default IntlSettingsContext;
