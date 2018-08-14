import * as React from "react";
import { ShallowWrapper } from "enzyme";

import Footer from "@client/views/connected/RootFooter";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<Footer />", () => {
  const props = {
    intl
  };

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(<Footer {...props} />);
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });
});
