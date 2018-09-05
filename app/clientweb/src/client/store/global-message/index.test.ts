import AppTypes from "AppTypes";
import * as actions from "@client/store/global-message/actions";
import { globalMessageReducer as reducer } from "@client/store/global-message";

describe("reducer:global-message", () => {
  it("has the correct default state", () => {
    expect(reducer(undefined, actions.TEST_ACTION())).toEqual({
      message: undefined
    });
  });

  it("uses the provided state", () => {
    const message: AppTypes.GlobalMessage = {
      header: "clockworkorange",
      color: "red",
      content: "a",
      list: undefined
    };
    expect(reducer({ message }, actions.TEST_ACTION())).toEqual({ message });
  });

  describe("with action types", () => {
    it("handles 'show'", () => {
      const message: AppTypes.GlobalMessage = {
        header: "aruba",
        color: "olive",
        content: undefined,
        list: ["jamaica", "bermuda", "bahamas"]
      };
      expect(reducer(undefined, actions.show(message))).toEqual({ message });
    });

    it("handles 'hide'", () => {
      expect(reducer(undefined, actions.hide())).toEqual({ message: undefined });
    });
  });
});
