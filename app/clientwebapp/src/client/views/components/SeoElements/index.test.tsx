// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";

import SeoElements from "@client/views/components/SeoElements";
import { shallowWithIntl } from "@client/utils/test-helpers";

describe("<SeoElements />", () => {
  const props = {};

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(<SeoElements {...props} />);
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });
});
