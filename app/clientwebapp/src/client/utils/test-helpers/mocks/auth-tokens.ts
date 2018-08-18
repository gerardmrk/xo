import AppTypes from "AppTypes";

export const authTokens: AppTypes.AuthModels.AuthTokens = {
  idToken: "idtoken",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  expiresIn: 3000
};

export default authTokens;
