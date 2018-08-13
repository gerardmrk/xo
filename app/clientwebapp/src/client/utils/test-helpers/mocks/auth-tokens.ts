import { AuthTokens } from "@client/store/session/models";

export const authTokens: AuthTokens = {
  idToken: "idtoken",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  expiresIn: 3000
};

export default authTokens;
