import AppTypes from "AppTypes";

/**
 * The AuthAPI must implement this abstract class
 */

export abstract class AbstractAuthAPI {
  public abstract async authenticate(
    username: string,
    password: string,
    remember: boolean
  ): Promise<AppTypes.AuthModels.AuthTokens>;

  public abstract async unauthenticate(): Promise<void>;
}
