/**
 * User API Stub
 *
 * For dev purposes
 */
import AppTypes from "AppTypes";
import sleep from "@client/utils/sleep";
import { AbstractUserAPI } from "@client/api/user/type";
import userSettings from "@client/utils/test-helpers/mocks/user-settings";

class UserAPIStub implements AbstractUserAPI {
  public constructor(config: AppTypes.Injected.UserServiceConf) {}

  // *******************************************************************************************************************
  //    UNAUTHENTICATED ENDPOINTS
  // *******************************************************************************************************************

  public async requestEmailVerification(email: string): Promise<void> {
    await sleep(2000);
    return;
  }

  public async requestPasswordReset(usernameOrEmail: string): Promise<void> {
    await sleep(2000);
    return;
  }

  public async resetPassword(newPassword: string): Promise<void> {
    await sleep(2000);
    return;
  }

  public async register(formValues: AppTypes.UserModels.RegistrationPayload): Promise<void> {
    await sleep(2000);
    return;
  }

  public async verifyCode(
    code: string,
    scope: AppTypes.UserModels.VerificationScope
  ): Promise<void> {
    await sleep(2000);
    return;
  }

  public async checkUsernameUniqueness(username: string): Promise<boolean> {
    await sleep(880);
    if (Date.now() % 2 === 0) return true;
    return false;
  }

  // *******************************************************************************************************************
  //    AUTHENTICATED ENDPOINTS
  // *******************************************************************************************************************

  public async getSettings(): Promise<AppTypes.UserModels.Settings> {
    await sleep(2000);

    return userSettings;
  }

  public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await sleep(2000);
    return;
  }
}

export default UserAPIStub;
