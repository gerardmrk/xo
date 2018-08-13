import reducer from "@client/store/app-statuses";
import * as actions from "@client/store/app-statuses/actions";

describe("reducer:app-statuses", () => {
  it("has a correct default state", () => {
    expect(reducer(undefined, actions.TEST_ACTION())).toEqual({
      updated: true
    });
  });

  it("uses the provided state", () => {
    expect(reducer({ updated: false }, actions.TEST_ACTION())).toEqual({
      updated: false
    });
  });

  describe("with action types", () => {
    it("handles 'updatesAvailable'", () => {
      expect(reducer(undefined, actions.updatesAvailable())).toEqual({
        updated: false
      });
    });

    it("handles 'updatesApplied'", () => {
      expect(reducer(undefined, actions.updatesApplied())).toEqual({
        updated: true
      });

      expect(reducer({ updated: false }, actions.updatesApplied())).toEqual({
        updated: true
      });
    });
  });
});
