import * as actions from "./actions";
import * as asyncActions from "./async-actions";
import { authTokens } from "@client/utils/test-helpers/mocks";
import { initTestStore } from "@client/utils/test-helpers/test-store";

// tests for session.login
// prettier-ignore
describe("async-actions: session.login", () => {
  let apiMethod: jest.Mock;
  let store: ReturnType<typeof initTestStore>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => authTokens) // normal
      .mockImplementationOnce(() => { throw new Error("auth_error"); }); // failed
    store = initTestStore({ auth: { authenticate: apiMethod } });
  });

  beforeEach(() => {
    store.dispatch(asyncActions.login("bucharest", "ljubljana", true));
  });

  afterEach(() => {
    store.clearActions();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(dispatched[0]).toEqual(actions.loginPending({ showLoader: "progress.logging_in" }));
    expect(dispatched[1]).toEqual(actions.loginSuccess(authTokens, { showLoader: false }));
    expect(apiMethod).toHaveBeenCalledTimes(1);
    expect(apiMethod).toHaveBeenCalledWith("bucharest", "ljubljana", true);
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(dispatched[1]).toEqual(actions.loginFailure(new Error("auth_error"), { showLoader: false }));
  });
});

// tests for session.logout
// prettier-ignore
describe("async-actions: session.logout", () => {
  let apiMethod: jest.Mock;
  let store: ReturnType<typeof initTestStore>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => {}) // normal
      .mockImplementationOnce(() => { throw new Error("auth_error"); }); // failed
    store = initTestStore({ auth: { unauthenticate: apiMethod } });
  });

  beforeEach(() => {
    store.dispatch(asyncActions.logout());
  });

  afterEach(() => {
    store.clearActions();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(dispatched[0]).toEqual(actions.logoutPending({ showLoader: "progress.logging_out" }));
    expect(dispatched[1]).toEqual(actions.logoutSuccess({ showLoader: false }));
    expect(apiMethod).toHaveBeenCalledTimes(1);
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(dispatched[1]).toEqual(actions.logoutFailure(new Error("auth_error"), { showLoader: false }));
  });
});
