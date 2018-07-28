// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { ShallowWrapper } from "enzyme";

import RouteLoaderUI from "@client/views/components/RouteLoaderUI";
import { intl, shallowWithIntl } from "@client/utils/test-helpers";

describe("<RouteLoaderUI />", () => {
  const props = {
    intl,
    isLoading: false,
    pastDelay: false,
    timedOut: false,
    error: undefined,
    retry: () => {}
  };

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallowWithIntl(<RouteLoaderUI {...props} />);
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });
});
