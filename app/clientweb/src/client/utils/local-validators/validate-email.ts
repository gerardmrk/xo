// tslint:disable:no-function-expression
import {
  FieldValidator,
  FieldValidationResult,
  FieldValidatorOptions
} from "@client/utils/local-validators";

/**
 * Email address validation
 * see -> https://en.wikipedia.org/wiki/Email_address
 *
 * syntax: <local-part>@<domain>`
 *
 * local-part cannot be more than 64 characters
 *
 */

// credits:
// - http://emailregex.com/
// - https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// - http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
// - http://fightingforalostcause.net/misc/2006/compare-email-regex.php
const DFLT_PATTERN: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface Options {
  required: boolean;
}

/**
 * Validates an email address
 * @param email email address to validate
 */
export const emailValidator = (opts?: FieldValidatorOptions): FieldValidator => {
  const pattern = DFLT_PATTERN;
  let isRequired = false;

  if (opts && opts.required) {
    isRequired = true;
  }

  return (email: string): FieldValidationResult => {
    if (isRequired && email.length === 0) {
      return {
        valid: false,
        invalidReason: "validation_rules.email.mandatory"
      };
    }

    if (email.length > 254 || !pattern.test(email)) {
      return {
        valid: false,
        invalidReason: "validation_rules.email.valid"
      };
    }

    return { valid: true };
  };
};

export default emailValidator;
