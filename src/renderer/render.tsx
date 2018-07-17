import * as React from "react";
import * as Loadable from "react-loadable";
import * as ReactDOMServer from "react-dom/server";
// import { getBundles } from "react-loadable/webpack";
import { Provider as StoreProvider } from "react-redux";
import { StaticRouter as Router } from "react-router-dom";

import API from "@client/api";
import App from "@client/views/App";
import initStore, { Store, StoreState } from "@client/store";
import IntlProvider from "@client/views/hocs/IntlProvider";
import AppSettingsProvider from "@client/views/hocs/AppSettingsProvider";
import IntlSettingsProvider from "@client/views/hocs/IntlSettingsProvider";
import BuildSettingsProvider from "@client/views/hocs/BuildSettingsProvider";

// REQUEST PARAMS
export type RendererParams = {
  url: string;
};

// RESPONSE PAYLOAD
export type RendererResponse = {
  renderedHTML: string;
  error?: Error;
};

// RENDERER
export const render = async ({ url }: RendererParams): Promise<RendererResponse> => {
  const resp: RendererResponse = {
    renderedHTML: ""
  };

  try {
    // Initialize store
    const store: Store = initStore(new API(AUTH_SERVICE_CONF, USER_SERVICE_CONF))({} as StoreState); // tslint:disable-line

    const modulesToPreload: string[] = [];
    const captureModuleName = (moduleName: string): void => {
      modulesToPreload.push(moduleName);
    };

    const routerContext = {};

    resp.renderedHTML = ReactDOMServer.renderToString(
      <Loadable.Capture report={captureModuleName}>
        <BuildSettingsProvider settings={INJECTED_BUILD_SETTINGS}>
          <AppSettingsProvider settings={INJECTED_APP_SETTINGS}>
            <IntlSettingsProvider settings={INJECTED_INTL_SETTINGS}>
              <IntlProvider>
                <StoreProvider store={store}>
                  <Router location={url} context={routerContext}>
                    <App />
                  </Router>
                </StoreProvider>
              </IntlProvider>
            </IntlSettingsProvider>
          </AppSettingsProvider>
        </BuildSettingsProvider>
      </Loadable.Capture>
    );

    // const bundles: ReturnType<typeof getBundles> = getBundles(
    //   stats,
    //   modulesToPreload
    // );
  } catch (error) {
    resp.error = error as Error;
  }

  return resp;
};
