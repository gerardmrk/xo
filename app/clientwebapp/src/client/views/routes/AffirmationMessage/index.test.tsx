// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

// import { AffirmationMessage } from "@client/views/routes/AffirmationMessage";
import { shallowWithIntl } from "@client/utils/test-helpers";

describe("<AffirmationMessage />", () => {
  // const props = {
  //   intl,
  //   isLoggedIn: false,
  //   isAuthenticating: false,
  //   guarded: true
  // };

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(<Router>{/* <AffirmationMessage {...props} /> */}</Router>);
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });

  it.skip("renders the right message preset", () => {});

  it.skip("prioritizes 'preset' if both 'preset' and 'message' are specified", () => {});
});
