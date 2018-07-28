// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";

import GlobalLoader from "@client/views/connected/GlobalLoader";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<GlobalLoader />", () => {
  const props = {
    intl
  };

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(<GlobalLoader {...props} />);
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });
});
