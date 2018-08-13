/**
 * Auth API
 */
import sleep from "@client/utils/sleep";
import { AuthTokens } from "@client/store/session/models";
import { AbstractAuthAPI } from "@client/api/auth/type";
import { isBrowserEnv } from "@client/utils/is-browser-env";

export interface Config {}

class AuthAPI implements AbstractAuthAPI {
  public constructor(config: Config) {}

  public async authenticate(
    username: string,
    password: string,
    remember: boolean
  ): Promise<AuthTokens> {
    await sleep(2000);

    const authTokens = {
      idToken: "idToken",
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      expiresIn: 2000
    };

    if (isBrowserEnv()) {
      this.cacheLocalSession(authTokens);
    }

    return authTokens;
  }

  public async unauthenticate(): Promise<void> {
    await sleep(2000);

    if (isBrowserEnv()) {
      this.purgeLocalSession();
    }
    return;
  }

  public isValidSession(): boolean {
    if (!isBrowserEnv()) throw new Error("This can only run on the browser");

    const isAuthenticatedSession: boolean =
      localStorage.getItem("id_token") !== undefined &&
      localStorage.getItem("access_token") !== undefined &&
      localStorage.getItem("refresh_token") !== undefined;

    const isFreshSession: boolean = true;

    return isAuthenticatedSession && isFreshSession;
  }

  // prettier-ignore
  public cacheLocalSession(decodedHash: AuthTokens): void {
    const { idToken, accessToken, refreshToken, expiresIn } = decodedHash;

    if (idToken !== undefined) localStorage.setItem("id_token", idToken);
    if (accessToken !== undefined) localStorage.setItem("access_token", accessToken);
    if (refreshToken !== undefined) localStorage.setItem("refresh_token", refreshToken);
    if (expiresIn !== undefined) localStorage.setItem("expires_at", JSON.stringify(expiresIn * 1000 + new Date().getTime()));
  }

  public purgeLocalSession(): void {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_at");
  }
}

export default AuthAPI;
