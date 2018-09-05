import { FieldValidator } from "@client/utils/local-validators";
import usernameValidator from "@client/utils/local-validators/validate-username";

describe("validate-username", async () => {
  let validateUsername: FieldValidator;

  beforeAll(async () => {
    validateUsername = usernameValidator({ required: true });
  });

  it("validates usernames with correct characters and length", () => {
    ["Djibouti", "budapest", "xox"].forEach((username: string) => {
      const { valid, invalidReason } = validateUsername(username);

      expect(valid).toBe(true);
      expect(invalidReason).toBeUndefined();
    });
  });

  it("invalidates an empty username string", async () => {
    const { valid, invalidReason } = validateUsername("");

    expect(valid).toBe(false);
    expect(invalidReason).toEqual("validation_rules.username.mandatory");
  });

  describe("for username with less than required length", async () => {
    it("invalidates with invalid chars", async () => {
      ["@(", "%(", "(#"].forEach((username: string) => {
        const { valid, invalidReason } = validateUsername(username);

        expect(valid).toBe(false);
        expect(invalidReason).toEqual("validation_rules.username.length");
      });
    });

    it("correctly invalidates even with valid chars", async () => {
      ["a", "bc", "d3"].forEach((username: string) => {
        const { valid, invalidReason } = validateUsername(username);

        expect(valid).toBe(false);
        expect(invalidReason).toEqual("validation_rules.username.length");
      });
    });
  });

  describe("for username with more than permitted length", async () => {
    it("invalidates with invalid chars", async () => {
      [
        "No I'm not colour-blind, I know this world is black and white",
        "Welcome to the real world, she said to me, condescendingly",
        "Take a seat. Take your life, plot it out in black and white"
      ].forEach((username: string) => {
        const { valid, invalidReason } = validateUsername(username);

        expect(valid).toBe(false);
        expect(invalidReason).toEqual("validation_rules.username.length");
      });
    });

    it("correctly invalidates even with valid chars", async () => {
      [
        "PerpetualMutliGatedFiniteStateMachine",
        "UnderminedNickolodeonCoterieOutcast",
        "ZeroSumPrestigeInReykjavikAndBucharest"
      ].forEach((username: string) => {
        const { valid, invalidReason } = validateUsername(username);

        expect(valid).toBe(false);
        expect(invalidReason).toEqual("validation_rules.username.length");
      });
    });
  });
});
