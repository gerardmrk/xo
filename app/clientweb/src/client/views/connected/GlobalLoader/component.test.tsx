import * as React from "react";
import { ReactWrapper } from "enzyme";

import Component, { Props, State } from "./component";
import { mountWithIntl } from "@client/utils/test-helpers/test-wrappers";

describe("<GlobalLoader />", () => {
  let props: Props;
  let wrapper: ReactWrapper<Props, State>;

  beforeAll(() => {
    props = {
      show: true,
      loadingMessage: "notlikethis"
    };

    wrapper = mountWithIntl<Props, State>(<Component {...props} />);
  });

  it("renders ok", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".main")).toExist();
  });

  it("renders <Loader/> from 'semantic-ui-react'", () => {
    expect(wrapper.find("Loader")).toExist();
  });

  it("displays the correct message", () => {
    expect(wrapper).toIncludeText(props.loadingMessage as string);
  });

  it("does not render if 'show' === false", () => {
    const hiddenWrapper = mountWithIntl<Props, State>(
      <Component loadingMessage={"xo"} show={false} />
    );
    expect(hiddenWrapper.html()).toEqual(null);
  });
});
