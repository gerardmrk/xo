import { RegistrationPayload, VerificationScope, UserSettings } from "@client/store/user/models";

/**
 * The UserAPI must implement this abstract class
 */
export abstract class UserAPI {
  // unauthenticated endpoints
  public abstract async requestEmailVerification(email: string): Promise<void>;
  public abstract async requestPasswordReset(usernameOrEmail: string): Promise<void>;
  public abstract async resetPassword(newPassword: string): Promise<void>;
  public abstract async register(formValues: RegistrationPayload): Promise<void>;
  public abstract async verifyCode(code: string, scope: VerificationScope): Promise<void>;
  // authenticated endpoints
  public abstract async getSettings(): Promise<UserSettings>;
  public abstract async changePassword(currentPassword: string, newPassword: string): Promise<void>;
}
