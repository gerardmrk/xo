// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";

import AuthRoutesContainer from "@client/views/components/AuthRoutesContainer";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<AuthRoutesContainer />", () => {
  const props = {
    intl,
    title: "ohno"
  };

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(<AuthRoutesContainer {...props} />);
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });
});
