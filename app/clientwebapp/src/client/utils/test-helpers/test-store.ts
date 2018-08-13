import asyncMiddleware from "redux-thunk";
import configureStore from "redux-mock-store";

// import API from "@client/api";
import * as middleware from "@client/store/middleware";
import { StoreState, StoreDispatcher } from "@client/store";

export const initTestStore = <A extends {}>(api: A) => {
  const mockStore = configureStore<StoreState, StoreDispatcher>([
    asyncMiddleware.withExtraArgument(api),
    ...Object.values(middleware)
  ]);
  return mockStore();
};
