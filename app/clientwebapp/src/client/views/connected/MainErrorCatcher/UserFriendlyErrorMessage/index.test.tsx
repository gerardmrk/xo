// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import { UserFriendlyErrorMessage } from "@client/views/connected/MainErrorCatcher/UserFriendlyErrorMessage";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<UserFriendlyErrorMessage />", () => {
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
        <UserFriendlyErrorMessage {...props} />
      </Router>
    );
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });
});
