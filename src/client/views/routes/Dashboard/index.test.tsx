// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import { Dashboard } from "@client/views/routes/Dashboard";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<Dashboard />", () => {
  const props = {
    intl,
    isLoggedIn: false,
    isAuthenticating: false,
    guarded: true
  };

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(
      <Router>
        <Dashboard {...props} />
      </Router>
    );
  });

  it("renders OK", () => {
    expect(component.exists()).toBe(true);
  });
});
