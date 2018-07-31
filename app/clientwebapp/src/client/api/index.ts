/**
 * API entrypoint
 *
 * - this is meant to be used as a singleton.
 * - only async store actions are allowed to call the API.
 */
import AuthAPI, { Config as AuthConfig } from "@client/api/auth";
import UserAPI, { Config as UserConfig } from "@client/api/user";
import { AbstractAuthAPI } from "@client/api/auth/type";
import { AbstractUserAPI } from "@client/api/user/type";

export interface APIConfig {
  stub?: boolean;
  authConf: AuthConfig;
  userConf: UserConfig;
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
