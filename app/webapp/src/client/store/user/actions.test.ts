import * as store from "@client/store";
import { initTestStore } from "@client/utils/test-helpers/test-store";
import { userSettings, registrationPayload } from "@client/utils/test-helpers/mocks";

// tests for user.getSettings
// prettier-ignore
describe("async-actions: user.getSettings", () => {
  let apiMethod: jest.Mock;
  let testStore: ReturnType<typeof initTestStore>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => userSettings) // normal call
      .mockImplementationOnce(() => { throw new Error(""); }); // failed call
    testStore = initTestStore({ user: { getSettings: apiMethod } });
  });

  beforeEach(() => {
    testStore.dispatch(store.userAsyncActions.getSettings());
  });

  afterEach(() => {
    testStore.clearActions();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(apiMethod).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(store.userActions.getSettingsPending({ showLoader: "progress.fetching_settings" }));
    expect(dispatched[1]).toEqual(store.userActions.getSettingsSuccess(userSettings, { showLoader: false }));
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(dispatched[1]).toEqual(store.userActions.getSettingsFailure(new Error(""), { showLoader: false }));
  });
});

// tests for user.register
// prettier-ignore
describe("async-actions: user.register", () => {
  let testStore: ReturnType<typeof initTestStore>;
  let apiMethod: jest.Mock;
  let callback: jest.Mock<ErrorFirstCallback>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => {}) // normal
      .mockImplementationOnce(() => { throw new Error("BAD"); }); // failed
    callback = jest.fn();
    testStore = initTestStore({ user: { register: apiMethod } });
  });

  beforeEach(() => {
    testStore.dispatch(store.userAsyncActions.register(registrationPayload, callback));
  });

  afterEach(() => {
    testStore.clearActions();
    callback.mockClear();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(apiMethod).toHaveBeenCalledWith(registrationPayload);
    expect(dispatched[0]).toEqual(store.userActions.registerPending({ showLoader: true }));
    expect(dispatched[1]).toEqual(store.userActions.registerSuccess({ showLoader: false }));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null);
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(dispatched[1]).toEqual(store.userActions.registerFailure(new Error("BAD"), { showLoader: false }));
    expect(callback).toHaveBeenCalledWith(new Error("BAD"));
  });
});

// tests for user.changePassword
// prettier-ignore
describe("async-actions: user.changePassword", () => {
  let testStore: ReturnType<typeof initTestStore>;
  let apiMethod: jest.Mock;

  beforeAll(() => {
    apiMethod = jest
      .fn()
      .mockImplementationOnce(() => {}) // normal
      .mockImplementationOnce(() => { throw new Error("BAD"); }); // failed
    testStore = initTestStore({ user: { changePassword: apiMethod } });
  });

  beforeEach(() => {
    testStore.dispatch(store.userAsyncActions.changePassword("rhodesisland", "newhampshire"));
  });

  afterEach(() => {
    testStore.clearActions();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(apiMethod).toHaveBeenCalledWith("rhodesisland", "newhampshire");
    expect(dispatched[0]).toEqual(store.userActions.changePasswordPending({ showLoader: true }));
    expect(dispatched[1]).toEqual(store.userActions.changePasswordSuccess({ showLoader: false }));
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(dispatched[1]).toEqual(store.userActions.changePasswordFailure(new Error("BAD"), { showLoader: false }));
  });
});

// tests for user.requestPasswordReset
// prettier-ignore
describe("async-actions: user.requestPasswordReset", () => {
  let testStore: ReturnType<typeof initTestStore>;
  let apiMethod: jest.Mock;
  let callback: jest.Mock<ErrorFirstCallback>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => {}) // normal
      .mockImplementationOnce(() => { throw new Error("BAD"); }); // failed
    callback = jest.fn();
    testStore = initTestStore({ user: { requestPasswordReset: apiMethod } });
  });

  beforeEach(() => {
    testStore.dispatch(store.userAsyncActions.requestPasswordReset("douglas_adams", callback));
  });

  afterEach(() => {
    testStore.clearActions();
    callback.mockClear();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(apiMethod).toHaveBeenCalledWith("douglas_adams");
    expect(dispatched[0]).toEqual(store.userActions.requestPasswordResetPending({ showLoader: true }));
    expect(dispatched[1]).toEqual(store.userActions.requestPasswordResetSuccess({ showLoader: false }));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null);
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(dispatched[1]).toEqual(store.userActions.requestPasswordResetFailure(new Error("BAD"), { showLoader: false }));
    expect(callback).toHaveBeenCalledWith(new Error("BAD"));
  });
});

// tests for user.resetPassword
// prettier-ignore
describe("async-actions: user.resetPassword", () => {
  let testStore: ReturnType<typeof initTestStore>;
  let apiMethod: jest.Mock;
  let callback: jest.Mock<ErrorFirstCallback>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => {}) // normal
      .mockImplementationOnce(() => { throw new Error("BAD"); }); // failed
    callback = jest.fn();
    testStore = initTestStore({ user: { resetPassword: apiMethod } });
  });

  beforeEach(() => {
    testStore.dispatch(store.userAsyncActions.resetPassword("SoLongAndThanksForAllTheFish", callback));
  });

  afterEach(() => {
    testStore.clearActions();
    callback.mockClear();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(apiMethod).toHaveBeenCalledWith("SoLongAndThanksForAllTheFish");
    expect(dispatched[0]).toEqual(store.userActions.resetPasswordPending({ showLoader: true }));
    expect(dispatched[1]).toEqual(store.userActions.resetPasswordSuccess({ showLoader: false }));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null);
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(dispatched[1]).toEqual(store.userActions.resetPasswordFailure(new Error("BAD"), { showLoader: false }));
    expect(callback).toHaveBeenCalledWith(new Error("BAD"));
  });
});

// tests for user.verifyCode
// prettier-ignore
describe("async-actions: user.verifyCode", () => {
  let testStore: ReturnType<typeof initTestStore>;
  let apiMethod: jest.Mock;
  let callback: jest.Mock<ErrorFirstCallback>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => {}) // normal
      .mockImplementationOnce(() => { throw new Error("BAD"); }); // failed
    callback = jest.fn();
    testStore = initTestStore({ user: { verifyCode: apiMethod } });
  });

  beforeEach(() => {
    testStore.dispatch(store.userAsyncActions.verifyCode("01W9FBB0347DD", "email", callback));
  });

  afterEach(() => {
    testStore.clearActions();
    callback.mockClear();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(apiMethod).toHaveBeenCalledWith("01W9FBB0347DD", "email");
    expect(dispatched[0]).toEqual(store.userActions.verifyCodePending({ showLoader: true }));
    expect(dispatched[1]).toEqual(store.userActions.verifyCodeSuccess({ showLoader: false }));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null);
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(dispatched[1]).toEqual(store.userActions.verifyCodeFailure(new Error("BAD"), { showLoader: false }));
    expect(callback).toHaveBeenCalledWith(new Error("BAD"));
  });
});

// tests for user.checkUsernameUniqueness
// prettier-ignore
describe("async-actions: user.checkUsernameUniqueness", () => {
  let testStore: ReturnType<typeof initTestStore>;
  let apiMethod: jest.Mock;
  let callback: jest.Mock<ErrorFirstCallback<boolean>>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => false) // normal
      .mockImplementationOnce(() => { throw new Error("BAD"); }); // failed
    callback = jest.fn();
    testStore = initTestStore({ user: { checkUsernameUniqueness: apiMethod } });
  });

  beforeEach(() => {
    testStore.dispatch(store.userAsyncActions.checkUsernameUniqueness("Metropolis", callback));
  });

  afterEach(() => {
    testStore.clearActions();
    callback.mockClear();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(apiMethod).toHaveBeenCalledWith("Metropolis");
    expect(dispatched[0]).toEqual(store.userActions.checkUsernameUniquenessPending());
    expect(dispatched[1]).toEqual(store.userActions.checkUsernameUniquenessSuccess(false));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, false);
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = testStore.getActions();
    expect(dispatched[1]).toEqual(store.userActions.checkUsernameUniquenessFailure(new Error("BAD")));
    expect(callback).toHaveBeenCalledWith(new Error("BAD"));
  });
});
