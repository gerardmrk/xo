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
  secondaryEmail?: string;
  secondaryMobile?: string;
}

export interface ProfileSettings {
  name: string;
  bio: string;
  isPublic: boolean;
  websiteURL?: string;
  profilePicURL?: string;
  bannerPicURL?: string;
}

export interface AppPreferences {
  notificationsEnabled: boolean;
}

export type UserSettings = {
  accountSettings: AccountSettings;
  profileSettings: ProfileSettings;
  appPreferences: AppPreferences;
};

export interface RegistrationPayload {
  username: string;
  email: string;
  password: string;
  agreeToTOS: boolean;
}
