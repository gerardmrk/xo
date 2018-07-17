// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import { PasswordChange } from "@client/views/routes/Account/PasswordChange";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<PasswordChange />", () => {
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
        <PasswordChange {...props} />
      </Router>
    );
  });

  it("renders OK", () => {
    expect(component.exists()).toBe(true);
  });
});
