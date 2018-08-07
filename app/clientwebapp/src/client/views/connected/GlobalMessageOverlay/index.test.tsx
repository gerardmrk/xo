// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";

import GlobalMessageOverlay from "@client/views/connected/GlobalMessageOverlay";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<GlobalMessageOverlay />", () => {
  const props = {
    intl
  };

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(<GlobalMessageOverlay {...props} />);
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });

  it.skip("is dismissable", async () => {});

  it.skip("renders the correct preset", async () => {});
});
