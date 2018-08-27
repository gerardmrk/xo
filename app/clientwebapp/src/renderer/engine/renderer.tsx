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
import initStore from "@client/store";
import I18nProvider from "@client/views/contexts/I18nContext";
import MainErrorCatcher from "@client/views/connected/MainErrorCatcher";
import { SettingsProvider } from "@client/views/contexts/SettingsContext";

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
export default (AsyncModuleLoader: typeof Loadable) => (manifest: Manifest) => async ({
  url
}: Params): Promise<Response> => {
  const resp: Response = {
    renderedHead: "",
    renderedBody: "",
    renderedTail: ""
  };

  try {
    const store = initStore(
      await API.BUILD({
        stub: true,
        settings: { ...INJECTED_SETTINGS.services }
      })
    )({ ...(window._INITIAL_STATE_ || {}) });

    delete window._INITIAL_STATE_;

    const renderedModules: string[] = [];

    const captureModules = (moduleName: string): void => {
      renderedModules.push(moduleName);
    };

    const routerContext = {};

    resp.renderedBody = ReactDOMServer.renderToString(
      <AsyncModuleLoader.Capture report={captureModules}>
        <SettingsProvider settings={{ ...INJECTED_SETTINGS }}>
          <MainErrorCatcher>
            <I18nProvider>
              <StoreProvider store={store}>
                <Router location={url} context={routerContext}>
                  <App />
                </Router>
              </StoreProvider>
            </I18nProvider>
          </MainErrorCatcher>
        </SettingsProvider>
      </AsyncModuleLoader.Capture>
    );

    // extract all bundle URIs
    resp.renderedTail = getBundles(manifest, renderedModules)
      .map((bundle: Bundle) => {
        return `<script src="${bundle ? bundle.file : ""}"></script>`;
      })
      .reduce((elmStrA: string, elmStrB: string) => {
        return `${elmStrA}${elmStrB}`;
      }, "");

    // extract the route's rendered elements for <Head />
    resp.renderedHead = Object.values(Helmet.renderStatic())
      .map((elm: HelmetDatum) => {
        return elm.toString();
      })
      .reduce((elmStrA: string, elmStrB: string) => {
        return `${elmStrA}${elmStrB}`;
      }, "");
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
