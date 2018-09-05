// tslint:disable:no-function-expression
import {
  FieldValidator,
  FieldValidationResult,
  FieldValidatorOptions
} from "@client/utils/local-validators";

export const usernameValidator = (opts?: FieldValidatorOptions): FieldValidator => {
  const MIN_LEN = 3;
  const MAX_LEN = 30;
  const PATTERN = /^[-\w\.\$@\*\!]+$/;

  let isRequired = false;

  if (opts !== undefined) {
    isRequired = opts.required || false;
  }

  return (username: string): FieldValidationResult => {
    if (isRequired && username.length === 0) {
      return {
        valid: false,
        invalidReason: "validation_rules.username.mandatory"
      };
    }

    if (username.length > MAX_LEN || username.length < MIN_LEN) {
      return {
        valid: false,
        invalidReason: "validation_rules.username.length"
      };
    }

    if (!PATTERN.test(username)) {
      return {
        valid: false,
        invalidReason: "validation_rules.username.characters"
      };
    }

    return { valid: true };
  };
};

export default usernameValidator;
