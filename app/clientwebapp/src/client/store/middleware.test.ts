import { initTestStore } from "@client/utils/test-helpers/test-store";

// tests for the global loading display middleware
describe.skip("store-middleware: globalLoaderMiddleware", () => {
  let store: ReturnType<typeof initTestStore>;

  beforeAll(() => {
    store = initTestStore({});
  });

  it("should not intercept and modify any passing actions", () => {});

  it("listens for actions with the 'showLoader' meta payload", () => {});
});

// tests for the global message overlay middleware
describe.skip("store-middleware: globalMessageMiddleware", () => {
  it("should not intercept and modify any passing actions", () => {});

  it("listens for actions with the 'showMessage' meta payload", () => {});
});
