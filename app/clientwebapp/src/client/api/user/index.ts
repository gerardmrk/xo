/**
 * User API
 *
 * responsible for making any calls to the user service
 */
import sleep from "@client/utils/sleep";
import { AbstractUserAPI } from "@client/api/user/type";
import { UserSettings, RegistrationPayload, VerificationScope } from "@client/store/user/models";
import userSettings from "@client/utils/test-helpers/mocks/user-settings";

export interface Config {}

class UserAPI implements AbstractUserAPI {
  public constructor(config: Config) {}

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

  public async register(formValues: RegistrationPayload): Promise<void> {
    await sleep(2000);
    return;
  }

  public async verifyCode(code: string, scope: VerificationScope): Promise<void> {
    await sleep(2000);
    return;
  }

  public async checkUsernameUniqueness(username: string): Promise<boolean> {
    await sleep(700);
    return true;
  }

  // *******************************************************************************************************************
  //    AUTHENTICATED ENDPOINTS
  // *******************************************************************************************************************

  public async getSettings(): Promise<UserSettings> {
    await sleep(2000);

    return userSettings;
  }

  public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await sleep(2000);
    return;
  }
}

export default UserAPI;
