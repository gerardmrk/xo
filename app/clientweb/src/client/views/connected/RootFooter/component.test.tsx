import * as React from "react";
import { ReactWrapper } from "enzyme";

import Component, { Props, State } from "./component";
import { mountWithIntl } from "@client/utils/test-helpers/test-wrappers";

describe("<RootFooter />", () => {
  let props: Props;
  let wrapper: ReactWrapper<Props, State>;

  beforeAll(() => {
    props = {};

    wrapper = mountWithIntl<Props, State>(<Component {...props} />);
  });

  it("renders ok", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("footer.main")).toExist();
  });
});
