import AppTypes from "AppTypes";
import * as store from "@client/store";
import { initTestStore } from "@client/utils/test-helpers/test-store";

// important to note (for the sake of brevity) that there isn't any specific reason
// user actions are being used here. It's being used only because the user store
// currently by default fires the most actions containing meta payloads. And since this
// is TypeScript, we can't afford to use any custom throwaway actions that aren't
// predefined, as it'll throw up a types error (this is a good thing anyways).

// tests for the global loading display middleware
describe("store-middleware: globalLoaderMiddleware", () => {
  let testStore: ReturnType<typeof initTestStore>;
  let expectedAction: AppTypes.Store.Action;

  beforeAll(() => {
    testStore = initTestStore({}, [store.middleware.globalLoaderMiddleware]);
    expectedAction = store.userActions.getSettingsPending({ showLoader: true });
  });

  beforeEach(() => {
    testStore.dispatch(expectedAction);
  });

  afterEach(() => {
    testStore.clearActions();
  });

  it("should not intercept and modify any passing actions", () => {
    const dispatched = testStore.getActions();
    // testing that the action made it through
    expect(dispatched[0]).toEqual(expectedAction);
  });

  it.skip("listens for actions with the 'showLoader' meta payload", () => {});
});

// tests for the global message overlay middleware
describe.skip("store-middleware: globalMessageMiddleware", () => {
  it("should not intercept and modify any passing actions", () => {});

  it("listens for actions with the 'showMessage' meta payload", () => {});
});
