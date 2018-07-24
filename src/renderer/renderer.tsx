// https://stackoverflow.com/questions/49288130/webpack-4-react-loadable-is-not-spliting-vendor-base-on-chucking-point
// https://github.com/jamiebuilds/react-loadable/pull/110
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

// REQUEST PARAMS
export type Params = {
  url: string;
};

// RESPONSE PAYLOAD
export type Response = {
  renderedHead: string;
  renderedBody: string;
  renderedTail: string;
  error?: Error;
};

// RENDERER
export default (manifest: Manifest): RenderFn => async ({ url }: Params): Promise<Response> => {
  const resp: Response = {
    renderedHead: "",
    renderedBody: "",
    renderedTail: ""
  };

  try {
    await Loadable.preloadAll();

    // Initialize store
    const store: Store = initStore(new API(AUTH_SERVICE_CONF, USER_SERVICE_CONF))({} as StoreState); // tslint:disable-line

    const modulesToPreload: string[] = [];
    const captureModules = (moduleName: string): void => {
      modulesToPreload.push(moduleName);
    };

    const routerContext = {};

    resp.renderedBody = ReactDOMServer.renderToString(
      <Loadable.Capture report={captureModules}>
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

    console.log(modulesToPreload); // tslint:disable-line

    // extract all bundle URIs
    resp.renderedTail = getBundles(manifest, modulesToPreload)
      .map((bundle: Bundle) => {
        console.log(bundle);
        return `<script src="${bundle.file}"></script>`;
      })
      .reduce((elmStrA: string, elmStrB: string): string => `${elmStrA}${elmStrB}`, "");

    // extract the route's rendered elements for <Head />
    resp.renderedHead = Object.values(Helmet.renderStatic())
      .map((elm: HelmetDatum): string => elm.toString())
      .reduce((elmStrA: string, elmStrB: string): string => `${elmStrA}${elmStrB}`, "");
  } catch (error) {
    resp.error = error as Error;
  }

  return resp;
};

interface Bundle {
  id: number;
  name: string;
  file: string;
}

interface Manifest {
  [moduleId: string]: Bundle[];
}

type RenderFn = (params: Params) => Promise<Response>;
