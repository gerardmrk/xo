// tslint:disable:no-function-expression
import {
  FieldValidator,
  FieldValidationResult,
  FieldValidatorOptions
} from "@client/utils/local-validators";

/**
 * credits:
 * - https://dzone.com/articles/use-regex-test-password
 * - https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
 */

// minimum length: 8 (arbitrary)
// maximum length: 20 (arbitrary)
// must contain a letter and a digit
// may contain special characters

export const passwordValidator = (opts?: FieldValidatorOptions): FieldValidator => {
  const MIN_LEN = 8;
  const MAX_LEN = 20;
  const PATTERN = /^((?=.*[A-Za-z])(?=.*\d)[A-Za-z\d])|((?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&])+/;

  let isRequired = false;

  if (opts !== undefined) {
    isRequired = opts.required || false;
  }

  return function validatePassword(password: string): FieldValidationResult {
    if (isRequired && password.length === 0) {
      return {
        valid: false,
        invalidReason: "validation_rules.password.mandatory"
      };
    }

    if (password.length > MAX_LEN || password.length < MIN_LEN) {
      return {
        valid: false,
        invalidReason: "validation_rules.password.length"
      };
    }

    if (!PATTERN.test(password)) {
      return {
        valid: false,
        invalidReason: "validation_rules.password.characters"
      };
    }

    return { valid: true };
  };
};

export default passwordValidator;
