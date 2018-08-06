// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import { Registration } from "@client/views/routes/Registration";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";
import { RegistrationPayload } from "@client/store/user/models";

describe("<Registration />", () => {
  const props = {
    intl,
    isLoggedIn: false,
    isAuthenticating: false,
    guarded: true
  };

  const registerStub = (form: RegistrationPayload): void => {};
  const checkUsernameUniquenessStub = (
    username: string,
    cb: ErrorFirstCallback<boolean>
  ): void => {};

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(
      <Router>
        <Registration
          {...props}
          register={registerStub}
          checkUsernameUniqueness={checkUsernameUniquenessStub}
        />
      </Router>
    );
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });

  it("renders a form with empty fields by default", () => {});

  describe("on form submit", () => {
    it("calls `props.register` with the correct params", () => {});
  });

  it("calls `props.validateUsername` when 'username' field is unfocused", () => {});

  it("calls `props.validatePassword` when 'password' field is unfocused", () => {});
});
