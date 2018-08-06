// import * as React from "react";
// import { ShallowWrapper } from "enzyme";
// import InputWithValidator, { Props } from "./";
// import { shallowWithIntl } from "@client/utils/test-helpers";

describe("<InputWithValidator />", async () => {
  // let component: ShallowWrapper;
  // beforeEach(() => {
  //   props = { forceValidate: false, onChangeProxy };

  //   component = shallowWithIntl(<InputWithValidator {...props} />);
  // });

  it.skip("renders ok", async () => {});

  it.skip("renders with all the correct input attributes", async () => {});

  it.skip("calls `props.validateInput` when `props.forceValidate === true`", async () => {});

  describe("on 'change' event", async () => {
    it.skip("calls `props.validateInput` on the value", async () => {});

    it.skip("calls `props.onChangeProxy` with the value and the valid flag", async () => {});
  });

  describe("on 'blur' event", () => {
    it.skip("calls `props.onBlur` if passed in", async () => {});

    describe("with invalid input", () => {
      it.skip("scrolls the input into view", async () => {});

      it.skip("highlights the input element", async () => {});

      it.skip("displays the invalidation message", async () => {});
    });
  });

  describe("on 'focus' event", () => {
    it.skip("hides invalidation message regardless of input validity", async () => {});
  });
});
