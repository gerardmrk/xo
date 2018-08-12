import { UserSettings } from "@client/store/user/models";

/**
 * exports a valid UserSettings object
 */

const userSettings: UserSettings = {
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
