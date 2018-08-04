/**
 * The UserAPI must implement this abstract class
 */
import { RegistrationPayload, VerificationScope, UserSettings } from "@client/store/user/models";
import { FieldValidationResult } from "@client/utils/local-validators";

export abstract class AbstractUserAPI {
  // *******************************************************************************************************************
  //    UNAUTHENTICATED ENDPOINTS
  // *******************************************************************************************************************

  /**
   * Unauthenticated endpoint for requesting email verification. The service is responsible for
   * sending an email to the user containing a link to the `/verification` route with a temporary code.
   * @param email email of the requesting user.
   */
  public abstract async requestEmailVerification(email: string): Promise<void>;

  /**
   * Unauthenticated endpoint for requesting a password reset. The service is responsible for
   * sending an email to the user containing a link to the `/verification` route with a temporary code.
   * If a username is used, the service should be responsible for resolving the email associated with the username,
   * and should not announce if the email/username exists to prevent information disclosure.
   * @param usernameOrEmail username or email of the requesting user.
   */
  public abstract async requestPasswordReset(usernameOrEmail: string): Promise<void>;

  /**
   * Unauthenticated endpoint for resetting password.
   * The app is responsible for checking password validity beforehand.
   * @param newPassword new password as entered by the usser.
   */
  public abstract async resetPassword(newPassword: string): Promise<void>;

  /**
   * Unauthenticated endpoint for user registration.
   * @param formValues the rego form object in key-value pairs
   */
  public abstract async register(formValues: RegistrationPayload): Promise<void>;

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
  public abstract async verifyCode(code: string, scope: VerificationScope): Promise<void>;

  /**
   * Unauthenticated endpoint for dynamically validating email. E.G.
   * - must be a valid email.
   * Note that unlike the username, email uniqueness should not be checked here, rather when the whole form is submitted.
   * This is to ensure information disclosure is difficult for potential attackers.
   * @param email the email address as entered by the user
   */
  public abstract async validateEmail(email: string): Promise<FieldValidationResult>;

  /**
   * Unauthenticated endpoint for dynamically validating username. E.G.
   * - username already exists
   * - username cannot contain ...
   * Validation can be implemented locally, client-side, but note that your validation rules
   * are hardcoded into your client bundle. This is okay if:
   * - you don't foresee your rules changing often.
   * - you'd rather check username uniqueness when the whole form is submitted (bad UX).
   * @param username the username as entered by the user
   */
  public abstract async validateUsername(username: string): Promise<FieldValidationResult>;

  /**
   * Unauthenticated endpoint for dynamically validating password. E.G.
   * - password length must be between ...
   * Validation can be implemented locally, client-side, but note that your validation rules
   * are hardcoded into your client bundle. This is okay if:
   * - you don't foresee your rules changing often.
   * @param password the password as entered by the user
   */
  public abstract async validatePassword(password: string): Promise<FieldValidationResult>;

  // *******************************************************************************************************************
  //    AUTHENTICATED ENDPOINTS
  // *******************************************************************************************************************

  /**
   * Authenticated endpoint for retrieving user settings.
   */
  public abstract async getSettings(): Promise<UserSettings>;

  /**
   * Authenticated endpoint for changing the user's password.
   * @param currentPassword the current password of the user
   * @param newPassword the new password as entered by the user
   */
  public abstract async changePassword(currentPassword: string, newPassword: string): Promise<void>;
}
