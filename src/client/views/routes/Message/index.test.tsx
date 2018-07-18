// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import { Message } from "@client/views/routes/Message";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<Message />", () => {
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
        <Message {...props} />
      </Router>
    );
  });

  it("renders OK", () => {
    expect(component.exists()).toBe(true);
  });
});
