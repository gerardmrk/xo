/**
 * User API
 *
 * responsible for making any calls to the user service
 */
import sleep from "@client/utils/sleep";
import { AbstractUserAPI } from "@client/api/user/type";
import emailValidator from "@client/utils/local-validators/validate-email";
import usernameValidator from "@client/utils/local-validators/validate-username";
import passwordValidator from "@client/utils/local-validators/validate-password";
import { FieldValidator, FieldValidationResult } from "@client/utils/local-validators";
import { UserSettings, RegistrationPayload, VerificationScope } from "@client/store/user/models";

export interface Config {}

class UserAPI implements AbstractUserAPI {
  public validateEmailField: FieldValidator;
  public validateUsernameField: FieldValidator;
  public validatePasswordField: FieldValidator;

  public constructor(config: Config) {
    this.validateEmailField = emailValidator();
    this.validateUsernameField = usernameValidator();
    this.validatePasswordField = passwordValidator();
  }

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

  public async validateEmail(email: string): Promise<FieldValidationResult> {
    await sleep(700);
    return this.validateEmailField(email);
  }

  public async validateUsername(username: string): Promise<FieldValidationResult> {
    await sleep(700);
    return this.validateUsernameField(username);
  }

  public async validatePassword(password: string): Promise<FieldValidationResult> {
    await sleep(700);
    return this.validatePasswordField(password);
  }

  // *******************************************************************************************************************
  //    AUTHENTICATED ENDPOINTS
  // *******************************************************************************************************************

  public async getSettings(): Promise<UserSettings> {
    await sleep(2000);

    return {
      appPreferences: {
        notificationsEnabled: false
      },
      accountSettings: {
        username: "Rasalhague",
        email: "rasalhague@supercluster.com",
        mobile: "+64210714166",
        mfaEnabled: false,
        emailVerified: true
      },
      profileSettings: {
        name: "daedalus",
        bio: "nothing much to see here",
        isPublic: true,
        profilePicURL: "https://picsum.photos/300/300"
      }
    };
  }

  public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await sleep(2000);
    return;
  }
}

export default UserAPI;
