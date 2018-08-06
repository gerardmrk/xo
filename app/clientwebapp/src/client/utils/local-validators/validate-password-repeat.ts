// tslint:disable:no-function-expression
import {
  FieldValidator,
  FieldValidationResult,
  FieldValidatorOptions
} from "@client/utils/local-validators";

export const passwordRepeatValidator = (opts?: FieldValidatorOptions): FieldValidator => {
  let isRequired = false;

  if (opts !== undefined) {
    isRequired = opts.required || false;
  }

  return function validatePasswordRepeat(value: string, pswd?: string): FieldValidationResult {
    if (isRequired && value.length === 0) {
      return {
        valid: false,
        invalidReason: "validation_rules.password_repeat.mandatory"
      };
    }

    if (value !== pswd) {
      // No need to worry bout timing-attacks here; this is only for the registration form,
      // to check the password-repeat field. i.e. you shouldn't be using this on login forms, duh -.-
      // That shouldn't need to be said, but I gotta say it just in case
      return {
        valid: false,
        invalidReason: "validation_rules.password_repeat.must_match"
      };
    }

    return { valid: true };
  };
};

export default passwordRepeatValidator;
