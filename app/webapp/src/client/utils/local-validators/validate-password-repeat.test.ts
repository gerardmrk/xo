import passwordRepeatValidator from "@client/utils/local-validators/validate-password-repeat";
import { FieldValidator } from "@client/utils/local-validators";

describe("validate-password-repeat", async () => {
  let validatePasswordRepeat: FieldValidator;

  beforeAll(async () => {
    validatePasswordRepeat = passwordRepeatValidator({ required: true });
  });

  it("invalidates with an empty string", async () => {
    const { valid, invalidReason } = validatePasswordRepeat("");

    expect(valid).toBe(false);
    expect(invalidReason).toEqual("validation_rules.password_repeat.mandatory");
  });

  it("invalidates a mismatched pair", async () => {
    const { valid, invalidReason } = validatePasswordRepeat("one is not", "like the other");

    expect(valid).toBe(false);
    expect(invalidReason).toEqual("validation_rules.password_repeat.must_match");
  });

  it("validates a matched pair", async () => {
    const { valid, invalidReason } = validatePasswordRepeat("quaddamage", "quaddamage");

    expect(valid).toBe(true);
    expect(invalidReason).toBeUndefined();
  });
});
