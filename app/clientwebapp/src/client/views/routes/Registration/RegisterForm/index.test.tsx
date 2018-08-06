// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";

import { RegisterForm } from "@client/views/routes/Registration/RegisterForm";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";
import { RegistrationPayload } from "@client/store/user/models";

describe("<RegisterForm />", () => {
  const props = {
    intl
  };

  const onFormSubmitStub = (form: RegistrationPayload): void => {};
  const checkUsernameUniquenessStub = (username: string): void => {};

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(
      <RegisterForm
        {...props}
        onFormSubmit={onFormSubmitStub}
        checkUsernameUniqueness={checkUsernameUniquenessStub}
      />
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
