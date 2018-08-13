import * as actions from "@client/store/user/actions";
import * as asyncActions from "@client/store/user/async-actions";
import { initTestStore } from "@client/utils/test-helpers/test-store";
import { userSettings, registrationPayload } from "@client/utils/test-helpers/mocks";

// tests for user.getSettings
// prettier-ignore
describe("async-actions: user.getSettings", () => {
  let apiMethod: jest.Mock;
  let store: ReturnType<typeof initTestStore>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => userSettings) // normal call
      .mockImplementationOnce(() => { throw new Error(""); }); // failed call
    store = initTestStore({ user: { getSettings: apiMethod } });
  });

  beforeEach(() => {
    store.dispatch(asyncActions.getSettings());
  });

  afterEach(() => {
    store.clearActions();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(dispatched[0]).toEqual(actions.getSettingsPending({ showLoader: "progress.fetching_settings" }));
    expect(dispatched[2]).toEqual(actions.getSettingsSuccess(userSettings, { showLoader: false }));
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(dispatched[2]).toEqual(actions.getSettingsFailure(new Error(""), { showLoader: false }));
  });
});

// tests for user.register
// prettier-ignore
describe("async-actions: user.register", () => {
  let store: ReturnType<typeof initTestStore>;
  let apiMethod: jest.Mock;
  let callback: jest.Mock<ErrorFirstCallback>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => {}) // normal
      .mockImplementationOnce(() => { throw new Error("BAD"); }); // failed
    callback = jest.fn();
    store = initTestStore({ user: { register: apiMethod } });
  });

  beforeEach(() => {
    store.dispatch(asyncActions.register(registrationPayload, callback));
  });

  afterEach(() => {
    store.clearActions();
    callback.mockClear();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(apiMethod).toHaveBeenCalledWith(registrationPayload);
    expect(dispatched[0]).toEqual(actions.registerPending({ showLoader: true }));
    expect(dispatched[2]).toEqual(actions.registerSuccess({ showLoader: false }));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null);
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(dispatched[2]).toEqual(actions.registerFailure(new Error("BAD"), { showLoader: false }));
    expect(callback).toHaveBeenCalledWith(new Error("BAD"));
  });
});

// tests for user.changePassword
// prettier-ignore
describe("async-actions: user.changePassword", () => {
  let store: ReturnType<typeof initTestStore>;
  let apiMethod: jest.Mock;

  beforeAll(() => {
    apiMethod = jest
      .fn()
      .mockImplementationOnce(() => {}) // normal
      .mockImplementationOnce(() => { throw new Error("BAD"); }); // failed
    store = initTestStore({ user: { changePassword: apiMethod } });
  });

  beforeEach(() => {
    store.dispatch(asyncActions.changePassword("rhodesisland", "newhampshire"));
  });

  afterEach(() => {
    store.clearActions();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(apiMethod).toHaveBeenCalledWith("rhodesisland", "newhampshire");
    expect(dispatched[0]).toEqual(actions.changePasswordPending({ showLoader: true }));
    expect(dispatched[2]).toEqual(actions.changePasswordSuccess({ showLoader: false }));
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(dispatched[2]).toEqual(actions.changePasswordFailure(new Error("BAD"), { showLoader: false }));
  });
});

// tests for user.requestPasswordReset
// prettier-ignore
describe("async-actions: user.requestPasswordReset", () => {
  let store: ReturnType<typeof initTestStore>;
  let apiMethod: jest.Mock;
  let callback: jest.Mock<ErrorFirstCallback>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => {}) // normal
      .mockImplementationOnce(() => { throw new Error("BAD"); }); // failed
    callback = jest.fn();
    store = initTestStore({ user: { requestPasswordReset: apiMethod } });
  });

  beforeEach(() => {
    store.dispatch(asyncActions.requestPasswordReset("douglas_adams", callback));
  });

  afterEach(() => {
    store.clearActions();
    callback.mockClear();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(apiMethod).toHaveBeenCalledWith("douglas_adams");
    expect(dispatched[0]).toEqual(actions.requestPasswordResetPending({ showLoader: true }));
    expect(dispatched[2]).toEqual(actions.requestPasswordResetSuccess({ showLoader: false }));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null);
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(dispatched[2]).toEqual(actions.requestPasswordResetFailure(new Error("BAD"), { showLoader: false }));
    expect(callback).toHaveBeenCalledWith(new Error("BAD"));
  });
});

// tests for user.resetPassword
// prettier-ignore
describe("async-actions: user.resetPassword", () => {
  let store: ReturnType<typeof initTestStore>;
  let apiMethod: jest.Mock;
  let callback: jest.Mock<ErrorFirstCallback>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => {}) // normal
      .mockImplementationOnce(() => { throw new Error("BAD"); }); // failed
    callback = jest.fn();
    store = initTestStore({ user: { resetPassword: apiMethod } });
  });

  beforeEach(() => {
    store.dispatch(asyncActions.resetPassword("SoLongAndThanksForAllTheFish", callback));
  });

  afterEach(() => {
    store.clearActions();
    callback.mockClear();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(apiMethod).toHaveBeenCalledWith("SoLongAndThanksForAllTheFish");
    expect(dispatched[0]).toEqual(actions.resetPasswordPending({ showLoader: true }));
    expect(dispatched[2]).toEqual(actions.resetPasswordSuccess({ showLoader: false }));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null);
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(dispatched[2]).toEqual(actions.resetPasswordFailure(new Error("BAD"), { showLoader: false }));
    expect(callback).toHaveBeenCalledWith(new Error("BAD"));
  });
});

// tests for user.verifyCode
// prettier-ignore
describe("async-actions: user.verifyCode", () => {
  let store: ReturnType<typeof initTestStore>;
  let apiMethod: jest.Mock;
  let callback: jest.Mock<ErrorFirstCallback>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => {}) // normal
      .mockImplementationOnce(() => { throw new Error("BAD"); }); // failed
    callback = jest.fn();
    store = initTestStore({ user: { verifyCode: apiMethod } });
  });

  beforeEach(() => {
    store.dispatch(asyncActions.verifyCode("01W9FBB0347DD", "email", callback));
  });

  afterEach(() => {
    store.clearActions();
    callback.mockClear();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(apiMethod).toHaveBeenCalledWith("01W9FBB0347DD", "email");
    expect(dispatched[0]).toEqual(actions.verifyCodePending({ showLoader: true }));
    expect(dispatched[2]).toEqual(actions.verifyCodeSuccess({ showLoader: false }));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null);
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(dispatched[2]).toEqual(actions.verifyCodeFailure(new Error("BAD"), { showLoader: false }));
    expect(callback).toHaveBeenCalledWith(new Error("BAD"));
  });
});

// tests for user.checkUsernameUniqueness
// prettier-ignore
describe("async-actions: user.checkUsernameUniqueness", () => {
  let store: ReturnType<typeof initTestStore>;
  let apiMethod: jest.Mock;
  let callback: jest.Mock<ErrorFirstCallback<boolean>>;

  beforeAll(() => {
    apiMethod = jest.fn()
      .mockImplementationOnce(() => false) // normal
      .mockImplementationOnce(() => { throw new Error("BAD"); }); // failed
    callback = jest.fn();
    store = initTestStore({ user: { checkUsernameUniqueness: apiMethod } });
  });

  beforeEach(() => {
    store.dispatch(asyncActions.checkUsernameUniqueness("Metropolis", callback));
  });

  afterEach(() => {
    store.clearActions();
    callback.mockClear();
  });

  it("[normal] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(apiMethod).toHaveBeenCalledWith("Metropolis");
    expect(dispatched[0]).toEqual(actions.checkUsernameUniquenessPending());
    expect(dispatched[1]).toEqual(actions.checkUsernameUniquenessSuccess(false));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, false);
  });

  it("[failed] dispatches correct actions in the right order, calls the right API method, and handles the return values", () => {
    const dispatched = store.getActions();
    expect(dispatched[1]).toEqual(actions.checkUsernameUniquenessFailure(new Error("BAD")));
    expect(callback).toHaveBeenCalledWith(new Error("BAD"));
  });
});
