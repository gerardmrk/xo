// tslint:disable:no-relative-imports typedef mocha-no-side-effect-code no-multiline-string
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import { DevErrorDisplay } from "@client/views/connected/TopLevelErrorCatcher/DevErrorDisplay";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

const errorInfo: React.ErrorInfo = {
  componentStack: `
  in Instructions (created by InjectIntl(Instructions))
  in InjectIntl(Instructions) (created by LoadableComponent)
  in LoadableComponent (created by Route)
  in Route (created by Route)
  in Route (created by Connect(Route))
  in Connect(Route) (created by App)
  in Switch (created by App)
  in main (created by App)
  in div (created by App)
  in App (created by Route)
  in Route (created by withRouter(App))
  in withRouter(App) (created by HotExportedwithRouter(App))
  in AppContainer (created by HotExportedwithRouter(App))
  in HotExportedwithRouter(App)
  in Router (created by BrowserRouter)
  in BrowserRouter
  in Provider
  in IntlProvider
  in IntlProvider
  in TopLevelErrorCatcher
  in withSettings(TopLevelErrorCatcher)
  in IntlSettingsProvider
  in SettingsProvider`
};

describe("<DevErrorDisplay />", () => {
  const props = {
    intl,
    error: new Error(""),
    errorInfo
  };

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(
      <Router>
        <DevErrorDisplay {...props} />
      </Router>
    );
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });
});
