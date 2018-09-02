import * as path from "path";
import * as util from "util";
import * as React from "react";
import Loadable from "react-loadable";
import { StaticRouter } from "react-router-dom";
import { Helmet, HelmetDatum } from "react-helmet";
import * as ReactDOMServer from "react-dom/server";
import { getBundles } from "react-loadable/webpack";
import { Provider as StoreProvider } from "react-redux";

import API from "@client/api";
import App from "@client/views/App";
import initStore from "@client/store";
import proto from "@proto/js";
import I18nProvider from "@client/views/contexts/I18nContext";
import MainErrorCatcher from "@client/views/connected/MainErrorCatcher";
import { SettingsProvider } from "@client/views/contexts/SettingsContext";

// RENDERER
export default (AsyncModuleLoader: typeof Loadable) => (manifest: Manifest) => async (
  params: Uint8Array
): Promise<Uint8Array> => {
  const timer = process.hrtime();

  // REQUEST
  const request = proto.RendererParams.decode(params);
  // RESPONSE
  const response = proto.RendererResponse.create({
    statusCode: 200,
    redirectTo: "",
    error: null,
    ttr: 0,
    renderedHead: null,
    renderedBody: null,
    renderedStyles: null,
    renderedScripts: null
  });

  try {
    const store = initStore(
      await API.BUILD({
        stub: true,
        settings: { ...INJECTED_SETTINGS.services }
      })
    )({});

    const renderedModules: string[] = [];

    const captureModules = (moduleName: string): void => {
      renderedModules.push(moduleName);
    };

    const routerContext: RouterContext = {};

    response.renderedBody = new util.TextEncoder().encode(
      ReactDOMServer.renderToString(
        <AsyncModuleLoader.Capture report={captureModules}>
          <SettingsProvider settings={{ ...INJECTED_SETTINGS }}>
            <MainErrorCatcher>
              <I18nProvider>
                <StoreProvider store={store}>
                  <StaticRouter location={request.url} context={routerContext}>
                    <App />
                  </StaticRouter>
                </StoreProvider>
              </I18nProvider>
            </MainErrorCatcher>
          </SettingsProvider>
        </AsyncModuleLoader.Capture>
      )
    );

    if (routerContext.url) {
      response.statusCode = 302;
      response.redirectTo = routerContext.url;
    } else {
      // extract the route's rendered elements for <Head />
      response.renderedHead = new util.TextEncoder().encode(
        Object.values(Helmet.renderStatic())
          .map((elm: HelmetDatum) => elm.toString())
          .reduce((elms: string, elm: string) => `${elm}${elms}`, "")
      );

      let styles = "";
      let scripts = "";
      for (let bb = getBundles(manifest, renderedModules), i = bb.length - 1; i >= 0; i--) {
        const { file } = bb[i];
        switch (path.extname(file)) {
          case ".css":
            styles += `<link href="${file}" rel="stylesheet">`;
            break;
          case ".js":
            scripts += `<script src="${file}"></script>`;
            break;
          default:
        }
      }
      response.renderedStyles = new util.TextEncoder().encode(styles);
      response.renderedScripts = new util.TextEncoder().encode(scripts);
    }
  } catch (error) {
    response.error = (error as Error).message;
  }

  response.ttr = process.hrtime(timer)[1] / 1000000;

  return proto.RendererResponse.encode(response).finish();
};

interface Bundle {
  id: number;
  name: string;
  file: string;
}

export interface Manifest {
  [moduleId: string]: Bundle[];
}

interface RouterContext {
  url?: string;
  status?: number;
}
