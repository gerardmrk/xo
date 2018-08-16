import "jest-enzyme";
import AppTypes from "AppTypes";

declare global {
  const INJECTED_APP_SETTINGS: AppTypes.Injected.AppSettings;
  const INJECTED_BUILD_SETTINGS: AppTypes.Injected.BuildSettings;
  const INJECTED_I18N_SETTINGS: AppTypes.Injected.I18nSettings;
  const AUTH_SVC_CONF: AppTypes.Injected.AuthServiceConf;
  const USER_SVC_CONF: AppTypes.Injected.UserServiceConf;

  interface Window {
    _INITIAL_STATE_: AppTypes.Store.State | undefined;
  }
}
