/**
 * User API
 *
 * responsible for making any calls to the user service
 */
import { UserSettings } from "@client/store/user/models";
import sleep from "@client/utils/sleep";

export interface Config {}

class UserAPI {
  public constructor(config: Config) {}

  public async register(): Promise<void> {
    await sleep(2000);
    return;
  }

  public async getSettings(): Promise<UserSettings> {
    await sleep(2000);

    return {
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

  public async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await sleep(2000);
    return;
  }

  public async resetPassword(newPassword: string): Promise<void> {
    await sleep(2000);
    return;
  }

  public async requestPasswordReset(usernameOrEmail: string): Promise<void> {
    await sleep(2000);
    return;
  }

  public async verifyToken(token: string, scope: string): Promise<void> {
    await sleep(2000);
    return;
  }
}

export default UserAPI;
