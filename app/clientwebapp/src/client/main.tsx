/**
 * main application entrypoint
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as AsyncLoader from "react-loadable";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import API from "@client/api";
import AppTypes from "AppTypes";
import App from "@client/views/App";
import { configureServiceWorker } from "@client/offline";
import { isBrowserEnv } from "@client/utils/is-browser-env";
import { initStore, appStatusesActions } from "@client/store";
import MainErrorCatcher from "@client/views/connected/MainErrorCatcher";
import { SettingsProvider } from "@client/views/contexts/SettingsContext";
import { I18nProvider } from "@client/views/contexts/I18nContext";
// include the semantic-ui theme files and configs
// import "@client/views/theme/semantic.less";

// prettier-ignore
(async (): Promise<void> => {
  const isBrowser = isBrowserEnv();

  try {
    // Get the initial store state, if any, from the global variable.
    const initialState: AppTypes.Store.State | {} = { ...window._INITIAL_STATE_ };
    window._INITIAL_STATE_ = undefined;

    // Initialize the app store with the API instance.
    const store = initStore(await API.BUILD({
      stub: true,
      authConf: { ...INJECTED_SETTINGS.services.auth },
      userConf: { ...INJECTED_SETTINGS.services.identity }
    }))(initialState);

    if (isBrowser) {
      // Ensure all required components that are marked async are already preloaded.
      await AsyncLoader.preloadReady();
    }

    if (isBrowser) {
      // Configure app for offline-usage. we don't want to await this.
      configureServiceWorker((error: Error | null) => {
        if (!!error) throw error;
        store.dispatch(appStatusesActions.updatesAvailable());
      });
    }

    let render: ReactDOM.Renderer = ReactDOM.render;
    if (isBrowser && !DEV_MODE) {
      // Set renderer fn as hydrate for isomorphism
      render = ReactDOM.hydrate;
    }

    render(
      <MainErrorCatcher errorServiceDSN={""}>
        <SettingsProvider settings={INJECTED_SETTINGS}>
          <I18nProvider intl={INJECTED_SETTINGS.app.intl}>
            <StoreProvider store={store}>
              <Router>
                <App />
              </Router>
            </StoreProvider>
          </I18nProvider>
        </SettingsProvider>
      </MainErrorCatcher>,
      document.getElementById("app-mount-point")
    );
  } catch (err) {
    // tslint:disable-next-line
    console.error(err);
  }
})();
