import asyncMiddleware from "redux-thunk";
import configureStore from "redux-mock-store";

import { StoreState, StoreDispatcher, StoreMiddleware } from "@client/store";

export const initTestStore = <A extends {}>(api: A, mdw: StoreMiddleware[] = []) => {
  const testStore = configureStore<StoreState, StoreDispatcher>([
    asyncMiddleware.withExtraArgument(api),
    ...mdw
  ]);
  return testStore();
};
