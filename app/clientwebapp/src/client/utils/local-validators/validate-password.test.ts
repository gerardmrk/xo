import passwordValidator from "@client/utils/local-validators/validate-password";
import { FieldValidator } from "@client/utils/local-validators";

describe("validate-password", async () => {
  let validatePassword: FieldValidator;

  beforeAll(async () => {
    validatePassword = passwordValidator();
  });

  it("validates passwords with correct characters and length", () => {
    ["sp1nnak3r", "Redwall#07", "$cl0ckw0rk-0range$"].forEach((pswd: string) => {
      const { valid, invalidReason } = validatePassword(pswd);

      expect(valid).toBe(true);
      expect(invalidReason).toBeUndefined();
    });
  });

  it("invalidates an empty password string", async () => {
    const { valid, invalidReason } = validatePassword("");

    expect(valid).toBe(false);
    expect(invalidReason).toEqual("validation_rules.password.mandatory");
  });

  describe("for password with less than required length", async () => {
    it("invalidates with invalid chars", async () => {
      ["111111", "qwert$", "--7--"].forEach((pswd: string) => {
        const { valid, invalidReason } = validatePassword(pswd);

        expect(valid).toBe(false);
        expect(invalidReason).toEqual("validation_rules.password.length");
      });
    });

    it("correctly invalidates even with valid chars", async () => {
      ["o82bw", "A1ff", "f423", "$w9-pp"].forEach((pswd: string) => {
        const { valid, invalidReason } = validatePassword(pswd);

        expect(valid).toBe(false);
        expect(invalidReason).toEqual("validation_rules.password.length");
      });
    });
  });

  describe("for password with more than permitted length", async () => {
    it("invalidates with invalid chars", async () => {
      [
        "No I'm not colour-blind, I know this world is black and white",
        "Welcome to the real world, she said to me, condescendingly",
        "Take a seat. Take your life, plot it out in black and white"
      ].forEach((pswd: string) => {
        const { valid, invalidReason } = validatePassword(pswd);

        expect(valid).toBe(false);
        expect(invalidReason).toEqual("validation_rules.password.length");
      });
    });

    it("correctly invalidates even with valid chars", async () => {
      [
        "0kie d0kie, alkie, keep it lowkey like Thor lil bro",
        "Pull up 1nside a huggy, Starsky & Hutch a dougie",
        "Wiley up 0ff peyote, wilding lik3 that coyote"
      ].forEach((pswd: string) => {
        const { valid, invalidReason } = validatePassword(pswd);

        expect(valid).toBe(false);
        expect(invalidReason).toEqual("validation_rules.password.length");
      });
    });
  });
});
