import { FieldValidator, FieldValidationResult } from "@client/utils/local-validators";

/**
 * credits:
 * - https://dzone.com/articles/use-regex-test-password
 * - https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
 */

// minimum length: 8 (arbitrary)
// maximum length: 20 (arbitrary)
// must contain a letter and a digit
// may contain special characters
const DFLT_MIN_LEN = 8;
const DFLT_MAX_LEN = 20;
const DFLT_PATTERN = /^((?=.*[A-Za-z])(?=.*\d)[A-Za-z\d])|((?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&])+/;

export interface Options {
  minLen?: number;
  maxLen?: number;
  pattern?: RegExp;
}

export const passwordValidator = (opts?: Options): FieldValidator => (
  password: string
): FieldValidationResult => {
  let minLen = DFLT_MIN_LEN;
  let maxLen = DFLT_MAX_LEN;
  let pattern = DFLT_PATTERN;

  if (opts !== undefined) {
    minLen = opts.minLen || DFLT_MIN_LEN;
    maxLen = opts.minLen || DFLT_MAX_LEN;
    pattern = opts.pattern || DFLT_PATTERN;
  }

  if (password.length === 0) {
    return {
      valid: false,
      invalidReason: "validation_rules.password.mandatory"
    };
  }

  if (password.length > maxLen || password.length < minLen) {
    return {
      valid: false,
      invalidReason: "validation_rules.password.length"
    };
  }

  if (!pattern.test(password)) {
    return {
      valid: false,
      invalidReason: "validation_rules.password.characters"
    };
  }

  return { valid: true };
};

export default passwordValidator;
