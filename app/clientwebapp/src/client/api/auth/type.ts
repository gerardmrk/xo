import { AuthTokens } from "@client/store/session/models";

/**
 * The AuthAPI must implement this abstract class
 */

export abstract class AbstractAuthAPI {
  public abstract async authenticate(
    username: string,
    password: string,
    remember: boolean
  ): Promise<AuthTokens>;

  public abstract cacheLocalSession(tokens: AuthTokens): void;
}
