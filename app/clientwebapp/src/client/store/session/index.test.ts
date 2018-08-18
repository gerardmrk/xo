import AppTypes from "AppTypes";
import * as actions from "@client/store/session/actions";
import { sessionReducer as reducer, SessionState } from "@client/store/session";

describe("reducer:session", () => {
  let authTokens: AppTypes.AuthModels.AuthTokens;
  let authenticatedState: SessionState;
  beforeAll(() => {
    authTokens = {
      idToken: "minsk",
      accessToken: "podgorica",
      refreshToken: "zagreb",
      expiresIn: 2000
    };
    authenticatedState = {
      authenticated: true,
      authenticating: false,
      authTokens
    };
  });

  it("has the correct default state", () => {
    expect(reducer(undefined, actions.TEST_ACTION())).toEqual({
      authenticated: false,
      authenticating: false,
      authTokens: undefined
    });
  });

  it("uses the provided state", () => {
    // prettier-ignore
    expect(reducer({
      authenticated: true,
      authenticating: false,
      authTokens
    }, actions.TEST_ACTION())).toEqual({
      authenticated: true,
      authenticating: false,
      authTokens
    });
  });

  describe("with action types", () => {
    it("handles 'loginPending'", () => {
      expect(reducer(undefined, actions.loginPending({ showLoader: true }))).toEqual({
        authenticated: false,
        authenticating: true,
        authTokens: undefined
      });
    });

    it("handles 'loginSuccess'", () => {
      expect(reducer(undefined, actions.loginSuccess(authTokens, { showLoader: false }))).toEqual({
        authenticated: true,
        authenticating: false,
        authTokens
      });
    });

    it("handles 'loginFailure'", () => {
      expect(
        reducer(
          authenticatedState,
          actions.loginFailure(new Error("sayeretmatkal"), { showLoader: false })
        )
      ).toEqual({
        authenticating: false,
        authenticated: false,
        authTokens: undefined
      });
    });

    it("handles 'logoutPending'", () => {
      expect(reducer(authenticatedState, actions.logoutPending({ showLoader: true }))).toEqual(
        authenticatedState
      );
    });

    it("handles 'logoutFailure'", () => {
      expect(
        reducer(authenticatedState, actions.logoutFailure(new Error("xoxo"), { showLoader: false }))
      ).toEqual(authenticatedState);
    });

    it("handles 'logoutSuccess'", () => {
      expect(reducer(authenticatedState, actions.logoutSuccess({ showLoader: false }))).toEqual({
        authenticated: false,
        authenticating: false,
        authTokens: undefined
      });
    });
  });
});
