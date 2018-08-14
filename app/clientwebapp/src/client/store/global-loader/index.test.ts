import { reducer } from "@client/store/global-loader";
import * as actions from "@client/store/global-loader/actions";

describe("reducer:global-loader", () => {
  it("has a correct default state", () => {
    expect(reducer(undefined, actions.TEST_ACTION())).toEqual({
      loading: false,
      message: undefined
    });
  });

  it("uses the provided state", () => {
    expect(reducer({ loading: true, message: "QWERTY" }, actions.TEST_ACTION())).toEqual({
      loading: true,
      message: "QWERTY"
    });
  });

  describe("with action types", () => {
    it("handles 'show'", () => {
      expect(reducer(undefined, actions.show())).toEqual({
        loading: true,
        message: undefined
      });
    });

    it("handles 'show' with a provided message", () => {
      expect(reducer(undefined, actions.show("addis ababa"))).toEqual({
        loading: true,
        message: "addis ababa"
      });
    });

    it("handles 'hide'", () => {
      expect(reducer(undefined, actions.hide())).toEqual({
        loading: false,
        message: undefined
      });

      expect(reducer({ loading: true, message: "help" }, actions.hide())).toEqual({
        loading: false,
        message: undefined
      });
    });
  });
});
