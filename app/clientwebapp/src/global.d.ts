import "jest-enzyme";
import AppTypes from "AppTypes";

declare global {
  const DEV_MODE: boolean;
  const APP_STAGE: "development" | "staging" | "production";
  const INJECTED_SETTINGS: AppTypes.Injected.Settings;

  interface Window {
    _INITIAL_STATE_: AppTypes.Store.State | undefined;
  }
}
