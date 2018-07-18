// translations
declare interface Messages {
  readonly [translationKey: string]: string;
}

// Injected via Webpack

declare type INJECTED_RENDERER_SCENARIO = "prefetch" | "server" | "embedded";

declare const INJECTED_APP_SETTINGS: {
  readonly name: string;
  readonly description: string;
  readonly browsers: string[];
  readonly urls: {
    readonly development: string;
    readonly staging: string;
    readonly production: string;
  };
};

declare const INJECTED_INTL_SETTINGS: {
  readonly defaultLanguage: string;
  readonly supportedLanguages: string[];
};

declare const INJECTED_BUILD_SETTINGS: {
  readonly devMode: boolean;
  readonly enableDevTools: boolean;
  readonly enableDebugger: boolean;
  readonly enableSourceMaps: boolean;
};

declare const AUTH_SERVICE_CONF: { [k: string]: string | number };
declare const USER_SERVICE_CONF: { [k: string]: string | number };
