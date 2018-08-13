import reducer from "@client/store/user";
import * as actions from "@client/store/user/actions";
import { UserSettings } from "@client/store/user/models";
import { userSettings } from "@client/utils/test-helpers/mocks";

describe("reducer:user", () => {
  let settings: UserSettings;
  beforeAll(() => {
    settings = userSettings;
  });

  it("has the correct default state", () => {
    expect(reducer(undefined, actions.TEST_ACTION())).toEqual({
      settings: undefined
    });
  });

  it("uses the provided state", () => {
    expect(reducer({ settings }, actions.TEST_ACTION())).toEqual({
      settings
    });
  });

  // prettier-ignore
  describe("with action types", () => {
    it("handles 'getSettingsPending'", () => {
      expect(reducer(undefined, actions.getSettingsPending({ showLoader: true }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'getSettingsSuccess'", () => {
      expect(reducer(undefined, actions.getSettingsSuccess(settings, { showLoader: false }))).toEqual({
        settings
      });
    });

    it("handles 'getSettingsFailure'", () => {
      expect(reducer(undefined, actions.getSettingsFailure(new Error("ohno"), { showLoader: false }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'registerPending'", () => {
      expect(reducer(undefined, actions.registerPending({ showLoader: true }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'registerSuccess'", () => {
      expect(reducer(undefined, actions.registerSuccess({ showLoader: false }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'registerFailure'", () => {
      expect(reducer(undefined, actions.registerFailure(new Error("oops"), { showLoader: false }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'changePasswordPending'", () => {
      expect(reducer(undefined, actions.changePasswordPending({ showLoader: true }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'changePasswordSuccess'", () => {
      expect(reducer(undefined, actions.changePasswordSuccess({ showLoader: false }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'changePasswordFailure'", () => {
      expect(reducer(undefined, actions.changePasswordFailure(new Error("yikes"), { showLoader: false }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'requestPasswordResetPending'", () => {
      expect(reducer(undefined, actions.requestPasswordResetPending({ showLoader: true }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'requestPasswordResetSuccess'", () => {
      expect(reducer(undefined, actions.requestPasswordResetSuccess({ showLoader: false }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'requestPasswordResetFailure'", () => {
      expect(reducer(undefined, actions.requestPasswordResetFailure(new Error("ohno"), { showLoader: false }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'resetPasswordPending'", () => {
      expect(reducer(undefined, actions.resetPasswordPending({ showLoader: true }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'resetPasswordSuccess'", () => {
      expect(reducer(undefined, actions.resetPasswordSuccess({ showLoader: false }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'resetPasswordFailure'", () => {
      expect(reducer(undefined, actions.resetPasswordFailure(new Error("help"), { showLoader: false }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'verifyCodePending'", () => {
      expect(reducer(undefined, actions.verifyCodePending({ showLoader: true }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'verifyCodeSuccess'", () => {
      expect(reducer(undefined, actions.verifyCodeSuccess({ showLoader: false }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'verifyCodeFailure'", () => {
      expect(reducer(undefined, actions.verifyCodeFailure(new Error("notlikethis"), { showLoader: false }))).toEqual({
        settings: undefined
      });
    });

    it("handles 'checkUsernameUniquenessPending'", () => {
      expect(reducer(undefined, actions.checkUsernameUniquenessPending())).toEqual({
        settings: undefined
      });
    });

    it("handles 'checkUsernameUniquenessSuccess'", () => {
      expect(reducer(undefined, actions.checkUsernameUniquenessSuccess(false))).toEqual({
        settings: undefined
      });
    });

    it("handles 'checkUsernameUniquenessFailure'", () => {
      expect(reducer(undefined, actions.checkUsernameUniquenessFailure(new Error("help")))).toEqual({
        settings: undefined
      });
    });
  });
});
