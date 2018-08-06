import { emailValidator } from "@client/utils/local-validators/validate-email";
import { usernameValidator } from "@client/utils/local-validators/validate-username";
import { passwordValidator } from "@client/utils/local-validators/validate-password";
import { passwordRepeatValidator } from "@client/utils/local-validators/validate-password-repeat";

export type FieldValidator = (fieldInput: string, extra?: string) => FieldValidationResult;

export interface FieldValidatorOptions {
  required?: boolean;
}

export interface FieldValidationResult {
  valid: boolean;
  invalidReason?: string;
}

export interface Validators {
  emailValidator(opts: FieldValidatorOptions): FieldValidator;
  usernameValidator(opts: FieldValidatorOptions): FieldValidator;
  passwordValidator(opts: FieldValidatorOptions): FieldValidator;
  passwordRepeatValidator(opts: FieldValidatorOptions): FieldValidator;
}

export const validators: Validators = {
  emailValidator,
  usernameValidator,
  passwordValidator,
  passwordRepeatValidator
};
