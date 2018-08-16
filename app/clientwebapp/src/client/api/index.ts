/**
 * API entrypoint
 *
 * - this is meant to be used as a singleton.
 * - only async store actions are allowed to call the API.
 */
import AppTypes from "AppTypes";
import AuthAPI from "@client/api/auth";
import UserAPI from "@client/api/user";
import { AbstractAuthAPI } from "@client/api/auth/type";
import { AbstractUserAPI } from "@client/api/user/type";

export interface APIConfig {
  stub: boolean;
  authConf: AppTypes.Injected.AuthServiceConf;
  userConf: AppTypes.Injected.UserServiceConf;
}

export class API {
  public auth: AbstractAuthAPI;
  public user: AbstractUserAPI;

  public static async BUILD({ stub, authConf, userConf }: APIConfig): Promise<API> {
    let Auth = AuthAPI;
    let User = UserAPI;

    if (stub) {
      Auth = (await import("@client/api/auth/stub")).default;
      User = (await import("@client/api/user/stub")).default;
    }
    return new API(new Auth(authConf), new User(userConf));
  }

  private constructor(auth: AbstractAuthAPI, user: AbstractUserAPI) {
    this.auth = auth;
    this.user = user;
  }
}

export default API;
