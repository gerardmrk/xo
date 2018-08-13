import { initTestStore } from "@client/utils/test-helpers/test-store";
import { globalLoaderMiddleware } from "@client/store/middleware";
import * as asyncActions from "@client/store/user/actions";
import { StoreAction } from "@client/store";

// important to note (for the sake of brevity) that there isn't any specific reason
// user actions are being used here. It's being used only because the user store
// currently by default fires the most actions containing meta payloads. And since this
// is TypeScript, we can't afford to use any custom throwaway actions that aren't
// predefined, as it'll throw up a types error (this is a good thing anyways).

// tests for the global loading display middleware
describe("store-middleware: globalLoaderMiddleware", () => {
  let store: ReturnType<typeof initTestStore>;
  let expectedAction: StoreAction;

  beforeAll(() => {
    store = initTestStore({}, [globalLoaderMiddleware]);
    expectedAction = asyncActions.getSettingsPending({ showLoader: true });
  });

  beforeEach(() => {
    store.dispatch(expectedAction);
  });

  afterEach(() => {
    store.clearActions();
  });

  it("should not intercept and modify any passing actions", () => {
    const dispatched = store.getActions();
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
