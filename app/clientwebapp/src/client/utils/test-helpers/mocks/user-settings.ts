import AppTypes from "AppTypes";

/**
 * exports a valid UserSettings object
 */

export const userSettings: AppTypes.UserModels.Settings = {
  preferences: {
    notificationsEnabled: false
  },
  account: {
    username: "Rasalhague",
    email: "rasalhague@supercluster.com",
    mobile: "+64210714166",
    mfaEnabled: false,
    emailVerified: true
  },
  profile: {
    name: "daedalus",
    bio: "nothing much to see here",
    isPublic: true,
    profilePicURL: "https://picsum.photos/300/300",
    websiteURL: undefined,
    bannerPicURL: undefined
  }
};

export default userSettings;
