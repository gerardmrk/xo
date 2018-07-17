// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import { UnknownErr } from "@client/views/routes/UnknownErr";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<UnknownErr />", () => {
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
        <UnknownErr {...props} />
      </Router>
    );
  });

  it("renders OK", () => {
    expect(component.exists()).toBe(true);
  });
});
