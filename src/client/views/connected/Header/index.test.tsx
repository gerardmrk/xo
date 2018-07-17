// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";

import Header from "@client/views/connected/Header";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<Header />", () => {
  const props = {
    intl
  };

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(<Header {...props} />);
  });

  it("renders OK", () => {
    expect(component.exists()).toBe(true);
  });
});
