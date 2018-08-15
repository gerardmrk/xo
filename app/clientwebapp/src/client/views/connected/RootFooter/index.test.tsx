import * as React from "react";
import { ShallowWrapper } from "enzyme";

import RootFooter from "@client/views/connected/RootFooter";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<Footer />", () => {
  let props: {};

  let component: ShallowWrapper;
  beforeEach(() => {
    props = { intl };
    component = shallowWithIntl(<RootFooter {...props} />);
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });
});
