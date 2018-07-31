/**
 * User API
 *
 * responsible for making any calls to the user service
 */
import sleep from "@client/utils/sleep";
import { UserSettings, RegistrationPayload, VerificationScope } from "@client/store/user/models";

export interface Config {}

class UserAPI {
  public constructor(config: Config) {}

  // *******************************************************************************************************************
  //    UNAUTHENTICATED ENDPOINTS
  // *******************************************************************************************************************

  /**
   * Unauthenticated endpoint for requesting email verification. The service is responsible for
   * sending an email to the user containing a link to the `/verification` route with a temporary code.
   * @param email email of the requesting user.
   */
  public async requestEmailVerification(email: string): Promise<void> {
    await sleep(2000);
    return;
  }

  /**
   * Unauthenticated endpoint for requesting a password reset. The service is responsible for
   * sending an email to the user containing a link to the `/verification` route with a temporary code.
   * If a username is used, the service should be responsible for resolving the email associated with the username,
   * and should not announce if the email/username exists to prevent information disclosure.
   * @param usernameOrEmail username or email of the requesting user.
   */
  public async requestPasswordReset(usernameOrEmail: string): Promise<void> {
    await sleep(2000);
    return;
  }

  /**
   * Unauthenticated endpoint for resetting password.
   * The app is responsible for checking password validity beforehand.
   * @param newPassword new password as entered by the usser.
   */
  public async resetPassword(newPassword: string): Promise<void> {
    await sleep(2000);
    return;
  }

  /**
   * Unauthenticated endpoint for user registration.
   * @param formValues the rego form object in key-value pairs
   */
  public async register(formValues: RegistrationPayload): Promise<void> {
    await sleep(2000);
    return;
  }

  /**
   * Unauthenticated endpoint for verifying code. The process flow goes like this:
   * 1. The service sends an email to the user containing a link, e.g. https://app.xo.com/verification?code={CODE}&scope={SCOPE}
   * 2. The user clicks on the link which directs him to the `/verification?...` route on the browser.
   * 3. The service checks if the code is valid and is still fresh (i.e. not expired). The route:
   *    3A. Notifies the user if the code is invalid or has expired. Options should be given to regenerate a new code.
   *    3B. Redirects to the password-reset page if scope == 'passwordreset'
   *    3C. Announces successful email verification if scope == 'email'.
   * @param code the code to verify
   * @param scope  the scope of the code (as of writing, either 'email' or 'passwordreset')
   */
  public async verifyCode(code: string, scope: VerificationScope): Promise<void> {
    await sleep(2000);
    return;
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

  /**
   * Authenticated endpoint for changing the user's password.
   * @param currentPassword the current password of the user
   * @param newPassword the new password as entered by the user
   */
  public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await sleep(2000);
    return;
  }
}

export default UserAPI;
