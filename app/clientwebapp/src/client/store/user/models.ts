/**
 * user state models
 */

export type VerificationScope = "email" | "passwordreset";

export interface AccountSettings {
  username: string;
  email: string;
  mobile: string;
  mfaEnabled: boolean;
  emailVerified: boolean;
}

export interface ProfileSettings {
  name: string;
  bio: string;
  isPublic: boolean;
  websiteURL: string | undefined;
  profilePicURL: string | undefined;
  bannerPicURL: string | undefined;
}

export interface AppPreferences {
  notificationsEnabled: boolean;
}

export type UserSettings = {
  account: AccountSettings;
  profile: ProfileSettings;
  preferences: AppPreferences;
};

export interface RegistrationPayload {
  username: string;
  email: string;
  password: string;
  agreeToTOS: boolean;
}

export class RegistrationError extends Error {
  public constructor(message: string) {
    super(message);
  }
}

export class AlreadyRegisteredError extends RegistrationError {
  public constructor() {
    super("Email already exists in our system.");
  }

  public get retryable(): boolean {
    return false;
  }
}
