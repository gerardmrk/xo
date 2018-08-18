import asyncMiddleware from "redux-thunk";
import configureStore from "redux-mock-store";

import AppTypes from "AppTypes";

export const initTestStore = <A extends {}>(api: A, mdw: AppTypes.Store.Middleware[] = []) => {
  const testStore = configureStore<AppTypes.Store.State, AppTypes.Store.Dispatcher>([
    asyncMiddleware.withExtraArgument(api),
    ...mdw
  ]);
  return testStore();
};
