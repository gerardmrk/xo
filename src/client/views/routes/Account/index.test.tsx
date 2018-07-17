// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import { Account } from "@client/views/routes/Account";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<Account />", () => {
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
        <Account {...props} />
      </Router>
    );
  });

  it("renders OK", () => {
    expect(component.exists()).toBe(true);
  });
});
