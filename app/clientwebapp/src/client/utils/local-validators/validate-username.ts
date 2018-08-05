// tslint:disable:no-function-expression
import { FieldValidator, FieldValidationResult } from "@client/utils/local-validators";

export interface Options {
  required: boolean;
  minLen?: number;
  maxLen?: number;
  pattern?: RegExp;
}

// minimum length: 3 (arbitrary)
// maximum length: 30 (arbitrary)
// cannot contain spaces and most special characters
const DFLT_MIN_LEN = 3;
const DFLT_MAX_LEN = 30;
const DFLT_PATTERN = /^[-\w\.\$@\*\!]+$/;

export const usernameValidator = (opts?: Options): FieldValidator => {
  let isRequired = false;
  let minLen = DFLT_MIN_LEN;
  let maxLen = DFLT_MAX_LEN;
  let pattern = DFLT_PATTERN;

  if (opts !== undefined) {
    isRequired = opts.required;
    minLen = opts.minLen || DFLT_MIN_LEN;
    maxLen = opts.minLen || DFLT_MAX_LEN;
    pattern = opts.pattern || DFLT_PATTERN;
  }

  return function validateUsername(username: string): FieldValidationResult {
    if (isRequired && username.length === 0) {
      return {
        valid: false,
        invalidReason: "validation_rules.username.mandatory"
      };
    }

    if (username.length > maxLen || username.length < minLen) {
      return {
        valid: false,
        invalidReason: "validation_rules.username.length"
      };
    }

    if (!pattern.test(username)) {
      return {
        valid: false,
        invalidReason: "validation_rules.username.characters"
      };
    }

    return { valid: true };
  };
};

export default usernameValidator;
