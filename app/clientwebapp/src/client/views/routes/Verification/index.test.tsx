// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

// import { Verification } from "@client/views/routes/Verification";
import { shallowWithIntl } from "@client/utils/test-helpers";

describe("<Verification />", () => {
  // const props = {
  //   intl,
  //   guarded: true,
  //   match: undefined,
  //   location: undefined,
  //   history: {}
  // };

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(<Router />);
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });
});
