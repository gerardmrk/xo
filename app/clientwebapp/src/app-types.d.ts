import { StateType } from "typesafe-actions";
import { DeepReadonlyObject } from "utility-types";
import { SemanticCOLORS } from "semantic-ui-react";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Dispatch, Middleware as _Middleware, Store as _Store } from "redux";
import { MessagePresets } from "@client/views/connected/GlobalMessageOverlay/preset-options";

import { API as _API } from "@client/api";
import { rootReducer, RootAction } from "@client/store";

declare module "AppTypes" {
  export type GlobalMessage =
    | DeepReadonlyObject<{
        header: string;
        color: SemanticCOLORS;
        content: string | undefined;
        list: string[] | undefined;
      }>
    | keyof MessagePresets
    | undefined;

  export namespace AuthModels {
    export interface AuthTokens {
      idToken: string;
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    }
  }
  export namespace UserModels {
    interface AppPreferences {
      notificationsEnabled: boolean;
    }

    interface AccountSettings {
      username: string;
      email: string;
      mobile: string;
      mfaEnabled: boolean;
      emailVerified: boolean;
    }

    interface ProfileSettings {
      name: string;
      bio: string;
      isPublic: boolean;
      websiteURL: string | undefined;
      profilePicURL: string | undefined;
      bannerPicURL: string | undefined;
    }

    export interface Settings {
      account: AccountSettings;
      profile: ProfileSettings;
      preferences: AppPreferences;
    }

    export interface RegistrationPayload {
      username: string;
      email: string;
      password: string;
      agreeToTOS: boolean;
    }

    export type VerificationScope = "email" | "passwordreset";
  }

  export type API = _API;

  export namespace Store {
    export type Action = RootAction;
    export type State = StateType<typeof rootReducer>;
    export type Store = _Store<State, Action>;
    export type AsyncAction = ThunkAction<Promise<void>, State, API, Action>;
    export type Dispatcher = Dispatch<Action> & ThunkDispatch<State, API, Action>;
    export type Middleware = _Middleware<void, State, Dispatcher>;
  }

  export namespace Injected {
    export interface AuthServiceConf {
      [k: string]: string;
    }

    export interface UserServiceConf {
      [k: string]: string;
    }

    export interface AppSettings {
      name: string;
      description: string;
      supportedBrowsers: string[];
      appURL: {
        development: string;
        staging: string;
        production: string;
      };
      sitemap: {
        [category: string]: { label: string; link: string }[];
      };
    }

    export interface I18nSettings {
      defaultLanguage: string;
      supportedLanguages: string[];
    }

    export interface BuildSettings {
      devMode: boolean;
      enableDevTools: boolean;
      enableDebugger: boolean;
      enableSourcemaps: boolean;
    }
  }
}
