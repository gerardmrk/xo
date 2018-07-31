/**
 * API entrypoint
 *
 * - this is meant to be used as a singleton.
 * - only async store actions are allowed to call the API.
 */
import AuthAPI, { Config as AuthAPIConfig } from "@client/api/auth";
import UserAPI, { Config as UserAPIConfig } from "@client/api/user";

export class API {
  public auth: AuthAPI;
  public user: UserAPI;

  public constructor(authConf: AuthAPIConfig, userConf: UserAPIConfig) {
    this.auth = new AuthAPI(authConf);
    this.user = new UserAPI(userConf);
  }
}

export default API;
