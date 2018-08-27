/**
 * main application entrypoint
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as AsyncLoader from "react-loadable";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import API from "@client/api";
import App from "@client/views/App";
import { configureServiceWorker } from "@client/offline";
import { initStore, appStatusesActions } from "@client/store";
import I18nProvider from "@client/views/contexts/I18nContext";
import MainErrorCatcher from "@client/views/connected/MainErrorCatcher";
import { SettingsProvider } from "@client/views/contexts/SettingsContext";
// include the semantic-ui theme files and configs
// import "@client/views/theme/semantic.less";

(async (): Promise<void> => {
  try {
    // Ensure all required components that are marked async are already preloaded.
    await AsyncLoader.preloadReady();

    const store = initStore(
      await API.BUILD({
        stub: true,
        settings: { ...INJECTED_SETTINGS.services }
      })
    )({ ...(window._INITIAL_STATE_ || {}) });

    delete window._INITIAL_STATE_;

    const render: ReactDOM.Renderer = DEV_MODE ? ReactDOM.render : ReactDOM.hydrate;

    render(
      <SettingsProvider settings={{ ...INJECTED_SETTINGS }}>
        <MainErrorCatcher>
          <I18nProvider>
            <StoreProvider store={store}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </StoreProvider>
          </I18nProvider>
        </MainErrorCatcher>
      </SettingsProvider>,
      document.getElementById("app-mount-point")
    );

    // Configure app for offline-usage. we don't want to await this.
    configureServiceWorker((error: Error | null) => {
      if (!!error) throw error;
      else store.dispatch(appStatusesActions.updatesAvailable());
    });
  } catch (err) {
    console.error(err); // tslint:disable-line
  }
})();
