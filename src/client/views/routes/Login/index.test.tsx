// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import { Login } from "@client/views/routes/Login";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<Login />", () => {
  const props = {
    intl,
    isLoggedIn: false,
    isAuthenticating: false,
    guarded: true
  };

  const loginHandler = (username: string, password: string) => {};

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(
      <Router>
        <Login {...props} login={loginHandler} />
      </Router>
    );
  });

  it("renders OK", () => {
    expect(component.exists()).toBe(true);
  });

  it.skip("sets focus on the username field on mount", () => {});

  it.skip("only submits the form on 'enter' when a field is focused", () => {});

  it.skip("only disables all fields when the form is in-flight", () => {});

  describe("unsuccessful form submission", () => {
    it.skip("reenables all input fields", () => {});

    it.skip("does not clear any input fields", () => {});

    it.skip("displays a reason for submission failure", () => {});
  });
});
