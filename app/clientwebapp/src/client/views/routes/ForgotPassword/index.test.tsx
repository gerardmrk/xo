// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import { ForgotPassword } from "@client/views/routes/ForgotPassword";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<ForgotPassword />", () => {
  const props = {
    intl,
    isLoggedIn: false,
    isAuthenticating: false,
    guarded: true
  };

  const handleOnRequestPasswordReset = (usernameOrEmail: string) => {};

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(
      <Router>
        <ForgotPassword {...props} requestPasswordReset={handleOnRequestPasswordReset} />
      </Router>
    );
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });
});
