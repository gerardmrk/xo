// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";

import Header from "@client/views/connected/RootHeader";
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
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });
});
