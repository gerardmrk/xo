// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

// import { Instructions } from "@client/views/routes/Instructions";
import { shallowWithIntl } from "@client/utils/test-helpers";

describe("<Instructions />", () => {
  // const props = {
  //   intl,
  //   isLoggedIn: false,
  //   isAuthenticating: false,
  //   guarded: true
  // };

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(<Router>{/* <Instructions {...props} /> */}</Router>);
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });

  it.skip("renders the right message preset", () => {});

  it.skip("prioritizes 'preset' if both 'preset' and 'message' are specified", () => {});
});
