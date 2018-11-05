import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import Component, { Props } from "./component";

describe(`<${Component.name} />`, () => {
  let props: Props;
  let wrapper: ShallowWrapper;

  beforeAll(() => {
    props = {
      show: true,
      loadingMessage: "notlikethis"
    };

    wrapper = shallow(<Component {...props} />);
  });

  it("renders ok", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toHaveDisplayName("div");
    expect(wrapper).toHaveClassName("main");
  });

  it("renders <Loader/> from 'semantic-ui-react'", () => {
    expect(wrapper.find("Loader")).toExist();
  });

  it("displays the correct message", () => {
    expect(wrapper).toIncludeText(props.loadingMessage as string);
  });

  it("does not render if 'show' === false", () => {
    const hiddenWrapper = shallow(
      <Component loadingMessage={"xo"} show={false} />
    );
    expect(hiddenWrapper).toBeEmptyRender();
  });
});
