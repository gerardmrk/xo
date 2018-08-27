import * as path from "path";
import * as React from "react";
import Loadable from "react-loadable";
import { Helmet, HelmetDatum } from "react-helmet";
import * as ReactDOMServer from "react-dom/server";
import { getBundles } from "react-loadable/webpack";
import { Provider as StoreProvider } from "react-redux";
import { StaticRouter } from "react-router-dom";

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
  status_code: number;
  redirect_to: string;
  rendered_head: string;
  rendered_body: string;
  rendered_mods: string;
  error: Error | undefined;
};

// RENDERER
export default (AsyncModuleLoader: typeof Loadable) => (manifest: Manifest) => async ({
  url
}: Params): Promise<Response> => {
  const resp: Response = {
    status_code: 200,
    redirect_to: "",
    rendered_head: "",
    rendered_body: "",
    rendered_mods: "",
    error: undefined
  };

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

    resp.rendered_body = ReactDOMServer.renderToString(
      <AsyncModuleLoader.Capture report={captureModules}>
        <SettingsProvider settings={{ ...INJECTED_SETTINGS }}>
          <MainErrorCatcher>
            <I18nProvider>
              <StoreProvider store={store}>
                <StaticRouter location={url} context={routerContext}>
                  <App />
                </StaticRouter>
              </StoreProvider>
            </I18nProvider>
          </MainErrorCatcher>
        </SettingsProvider>
      </AsyncModuleLoader.Capture>
    );

    if (routerContext.url) {
      resp.status_code = 302;
      resp.redirect_to = routerContext.url;
    } else {
      // extract the route's rendered elements for <Head />
      resp.rendered_head = Object.values(Helmet.renderStatic())
        .map((elm: HelmetDatum) => elm.toString())
        .reduce((elms: string, elm: string) => `${elm}${elms}`, "");

      for (let bb = getBundles(manifest, renderedModules), i = bb.length - 1; i >= 0; i--) {
        const { file } = bb[i];
        switch (path.extname(file)) {
          case ".css":
            resp.rendered_head += `<link href="${file}" rel="stylesheet">`;
            break;
          case ".js":
            resp.rendered_mods += `<script src="${file}"></script>`;
            break;
          default:
        }
      }
    }
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

export interface Manifest {
  [moduleId: string]: Bundle[];
}

interface RouterContext {
  url?: string;
  status?: number;
}
