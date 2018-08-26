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
import AppTypes from "AppTypes";
import App from "@client/views/App";
import initStore from "@client/store";
import MainErrorCatcher from "@client/views/connected/MainErrorCatcher";
import { SettingsProvider } from "@client/views/contexts/SettingsContext";
import I18nProvider from "@client/views/contexts/I18nContext";

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
    // Initialize store
    const store: AppTypes.Store.Store = initStore(
      await API.BUILD({ stub: true, settings: { ...INJECTED_SETTINGS.services } })
    )({} as AppTypes.Store.State); // tslint:disable-line

    const renderedModules: string[] = [];
    const captureModules = (moduleName: string): void => {
      renderedModules.push(moduleName);
    };

    const routerContext = {};

    resp.renderedBody = ReactDOMServer.renderToString(
      <AsyncModuleLoader.Capture report={captureModules}>
        <SettingsProvider settings={INJECTED_SETTINGS}>
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

    console.log(renderedModules); // tslint:disable-line

    // extract all bundle URIs
    resp.renderedTail = getBundles(manifest, renderedModules)
      .map((bundle: Bundle) => {
        // tslint:disable-next-line
        console.log(bundle);
        return `<script src="${bundle ? bundle.file : ""}"></script>`;
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
