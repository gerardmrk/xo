// OMG REACT-LOADABLE DOESN'T WORK WITH WEBPACK4
// SOMEONE KILL ME I SPENT SO MUCH TIME ON THIS
// https://stackoverflow.com/questions/49288130/webpack-4-react-loadable-is-not-spliting-vendor-base-on-chucking-point
import * as React from "react";
import { Helmet, HelmetDatum } from "react-helmet";
import * as Loadable from "react-loadable";
import * as ReactDOMServer from "react-dom/server";
import { getBundles } from "react-loadable/webpack";
import { Provider as StoreProvider } from "react-redux";
import { StaticRouter as Router } from "react-router-dom";

import API from "@client/api";
import App from "@client/views/App";
import initStore, { Store, StoreState } from "@client/store";
import IntlProvider from "@client/views/hocs/IntlProvider";
import AppSettingsProvider from "@client/views/hocs/AppSettingsProvider";
import IntlSettingsProvider from "@client/views/hocs/IntlSettingsProvider";
import BuildSettingsProvider from "@client/views/hocs/BuildSettingsProvider";
import asyncModuleStats from "../../dist/client/async-modules.json";

// REQUEST PARAMS
export type RendererParams = {
  url: string;
};

// RESPONSE PAYLOAD
export type RendererResponse = {
  renderedHead: string;
  renderedBody: string;
  renderedTail: string;
  error?: Error;
};

// RENDERER
export const render = async ({ url }: RendererParams): Promise<RendererResponse> => {
  const resp: RendererResponse = {
    renderedHead: "",
    renderedBody: "",
    renderedTail: ""
  };

  try {
    await Loadable.preloadAll();

    // Initialize store
    const store: Store = initStore(new API(AUTH_SERVICE_CONF, USER_SERVICE_CONF))({} as StoreState); // tslint:disable-line

    // tslint:disable
    const modulesToPreload: string[] = [];
    // const captureModuleName = (moduleName: string): void => {
    // modulesToPreload.push(moduleName);
    // };

    const routerContext = {};

    resp.renderedBody = ReactDOMServer.renderToString(
      <Loadable.Capture
        report={(moduleName: string): void => {
          modulesToPreload.push(moduleName);
        }}
      >
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

    // react-loadable's types are not exported properly
    resp.renderedTail = getBundles(asyncModuleStats as any, modulesToPreload)
      .map(bundle => `<script src="${bundle.file}"></script>`)
      .reduce((elmStrA: string, elmStrB: string): string => `${elmStrA}${elmStrB}`, "");
    // tslint:enable

    resp.renderedHead = Object.values(Helmet.renderStatic())
      .map((elm: HelmetDatum): string => elm.toString())
      .reduce((elmStrA: string, elmStrB: string): string => `${elmStrA}${elmStrB}`, "");
  } catch (error) {
    resp.error = error as Error;
  }

  return resp;
};
