// tslint:disable:no-relative-imports typedef
import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import App from "@client/views/App";

describe("<App />", () => {
  const props = {};

  let component: ShallowWrapper;
  beforeEach(() => {
    component = shallow(
      <Router>
        <App {...props} />
      </Router>
    );
  });

  it("renders OK", () => {
    expect(component.exists()).toBe(true);
  });
});
