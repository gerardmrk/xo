import emailValidator from "@client/utils/local-validators/validate-email";
import { FieldValidator } from "@client/utils/local-validators";

// test cases taken from:
// https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/

const VALID_EMAILS: string[] = [
  "email@domain.com",
  "firstname.lastname@domain.com",
  "email@subdomain.domain.com",
  "firstname+lastname@domain.com",
  // "email@123.123.123.123",
  "email@[123.123.123.123]",
  '"email"@domain.com',
  "1234567890@domain.com",
  "email@domain-one.com",
  "_______@domain.com",
  "email@domain.name",
  "email@domain.co.jp",
  "firstname-lastname@domain.com"
];

const INVALID_EMAILS: string[] = [
  "plainaddress",
  "#@%^%#$@#$@#.com",
  "@domain.com",
  "Joe Smith <email@domain.com>",
  "email.domain.com",
  "email@domain@domain.com",
  ".email@domain.com",
  "email.@domain.com",
  "email..email@domain.com",
  // "あいうえお@domain.com",
  "email@domain.com (Joe Smith)",
  "email@domain",
  // "email@-domain.com",
  // "email@domain.web",
  "email@111.222.333.44444",
  "email@domain..com"
];

describe("validate-email", async () => {
  let validateEmail: FieldValidator;

  beforeAll(async () => {
    validateEmail = emailValidator();
  });

  it("validates a valid email", async () => {
    VALID_EMAILS.forEach((email: string) => {
      const { valid, invalidReason } = validateEmail(email);

      expect(valid).toBe(true);
      expect(invalidReason).toBeUndefined();
    });
  });

  it("invalidates an empty email string", async () => {
    const { valid, invalidReason } = validateEmail("");

    expect(valid).toEqual(false);
    expect(invalidReason).toEqual("validation_rules.email.mandatory");
  });

  it("correctly invalidates an invalid email", async () => {
    INVALID_EMAILS.forEach((email: string) => {
      const { valid, invalidReason } = validateEmail(email);

      expect(valid).toEqual(false);
      expect(invalidReason).toEqual("validation_rules.email.valid");
    });
  });
});
