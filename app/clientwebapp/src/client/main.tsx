/**
 * main application entrypoint
 */
import * as debug from "debug";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as AsyncLoader from "react-loadable";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import * as OfflinePluginRuntime from "offline-plugin/runtime";

import API from "@client/api";
import App from "@client/views/App";
import { SettingsProvider } from "@client/views/contexts/SettingsContext";
import MainErrorCatcher from "@client/views/connected/MainErrorCatcher";
import { TranslationsEtAlProvider, IntlProvider } from "@client/views/contexts/I18nContext";
import initStore, { appStatusesActions, Store, StoreState } from "@client/store";
// include the semantic-ui theme files and configs
// import "@client/views/theme/semantic.less";

(async (): Promise<void> => {
  const debugSW = debug("serviceworker");

  try {
    // Get the initial store state, if any, from the global variable.
    const initialState: StoreState = window["_INITIAL_STATE_"] || {}; // tslint:disable-line

    // Initialize the app store with the API instance.
    const store: Store = initStore(
      await API.BUILD({ stub: true, authConf: AUTH_SERVICE_CONF, userConf: USER_SERVICE_CONF })
    )(initialState);

    // Ensure all required components that are marked async are already preloaded.
    await AsyncLoader.preloadReady();

    // Install the offline-plugin (caches assets in service-workers or app-cache).
    OfflinePluginRuntime.install({
      onUpdating: (): void => {
        debugSW("[event] onUpdating");
      },
      onUpdateReady: (): void => {
        // Force the new service worker to be immediately updated.
        // this won't happen by default until all tabs of yours sites are closed.
        debugSW("[event] onUpdateReady");
        OfflinePluginRuntime.applyUpdate();
      },
      onUpdated: (): void => {
        // Updates will not be reflected in the app until the next refresh.
        // either prompt the user for a refresh, or set a 'update-available' event on the store
        debugSW("[event] onUpdated");
        store.dispatch(appStatusesActions.updatesAvailable());
      },
      onUpdateFailed: (): void => {
        // This should be a `Retryable` error.
        // Handle accordingly - todo
        debugSW("[event] onUpdatedFailed");
      }
    });

    // Set the renderer to the hydrate function for isomorphic rendering.
    const renderIntoDOM: ReactDOM.Renderer = INJECTED_BUILD_SETTINGS.devMode
      ? ReactDOM.render
      : ReactDOM.hydrate;

    // Render the whole app into the DOM at the specified mount point.
    renderIntoDOM(
      <SettingsProvider appSettings={INJECTED_APP_SETTINGS} buildSettings={INJECTED_BUILD_SETTINGS}>
        <MainErrorCatcher errorServiceDSN={""}>
          <TranslationsEtAlProvider settings={INJECTED_I18N_SETTINGS}>
            <IntlProvider>
              <StoreProvider store={store}>
                <Router>
                  <App />
                </Router>
              </StoreProvider>
            </IntlProvider>
          </TranslationsEtAlProvider>
        </MainErrorCatcher>
      </SettingsProvider>,
      document.getElementById("app-mount-point")
    );
  } catch (err) {
    // tslint:disable-next-line
    console.error(err);
  }
})();
