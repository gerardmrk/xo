/**
 * main application entrypoint
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as AsyncLoader from "react-loadable";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import * as OfflinePluginRuntime from "offline-plugin/runtime";

import API from "@client/api";
import App from "@client/views/App";
import IntlProvider from "@client/views/wrappers/IntlProvider";
import initStore, { Store, StoreState } from "@client/store";
import SettingsProvider from "@client/views/wrappers/SettingsProvider";
import IntlSettingsProvider from "@client/views/wrappers/IntlSettingsProvider";
import TopLevelErrorCatcher from "@client/views/connected/TopLevelErrorCatcher";
// include the semantic-ui theme files and configs
// import "@client/views/theme/semantic.less";

(async (): Promise<void> => {
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
        // console.log("[SW]: `onUpdating` event");
      },
      onUpdateReady: (): void => {
        // console.log("[SW]: `onUpdateReady` event");
        // Force the new service worker to be immediately updated.
        // this won't happen by default until all tabs of yours sites are closed.
        OfflinePluginRuntime.applyUpdate();
      },
      onUpdated: (): void => {
        // console.log("[SW]: `onUpdated` event");
      },
      onUpdateFailed: (): void => {
        // console.log("[SW]: `onUpdateFailed` event");
      }
    });

    // Set the renderer to the hydrate function for isomorphic rendering.
    const renderIntoDOM: ReactDOM.Renderer = INJECTED_BUILD_SETTINGS.devMode
      ? ReactDOM.render
      : ReactDOM.hydrate;

    // Render the whole app into the DOM at the specified mount point.
    renderIntoDOM(
      <SettingsProvider appSettings={INJECTED_APP_SETTINGS} buildSettings={INJECTED_BUILD_SETTINGS}>
        <IntlSettingsProvider settings={INJECTED_INTL_SETTINGS}>
          <TopLevelErrorCatcher errorServiceDSN={""}>
            <IntlProvider>
              <StoreProvider store={store}>
                <Router>
                  <App />
                </Router>
              </StoreProvider>
            </IntlProvider>
          </TopLevelErrorCatcher>
        </IntlSettingsProvider>
      </SettingsProvider>,
      document.getElementById("app-mount-point")
    );
  } catch (err) {
    // tslint:disable-next-line
    console.error(err);
  }
})();
