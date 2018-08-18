import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import App from "@client/views/App";

describe("<App />", () => {
  let props: {};
  let component: ShallowWrapper;

  beforeEach(() => {
    props = {};
    component = shallow(
      <Router>
        <App {...props} />
      </Router>
    );
  });

  it("renders OK", () => {
    expect(component).toExist();
    expect(component).not.toBeEmptyRender();
  });
});
