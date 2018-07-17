/**
 * User API
 *
 * responsible for making any calls to the user service
 */
import { User } from "@client/store/user/models";

export interface Config {}

class UserAPI {
  public constructor(config: Config) {}

  public async getUser(): Promise<User> {
    return {
      username: "ebola",
      email: "ebola.ebola@arvid.com",
      description: "skrrr"
    };
  }
}

export default UserAPI;
