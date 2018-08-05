import { emailValidator } from "@client/utils/local-validators/validate-email";
import { usernameValidator } from "@client/utils/local-validators/validate-username";
import { passwordValidator } from "@client/utils/local-validators/validate-password";
import { passwordRepeatValidator } from "@client/utils/local-validators/validate-password-repeat";

export type FieldValidator = (fieldInput: string, extra?: string) => FieldValidationResult;

export interface FieldValidationResult {
  valid: boolean;
  invalidReason?: string;
}

export interface Validators {
  emailValidator(): FieldValidator;
  usernameValidator(): FieldValidator;
  passwordValidator(): FieldValidator;
  passwordRepeatValidator(): FieldValidator;
}

export const validators: Validators = {
  emailValidator,
  usernameValidator,
  passwordValidator,
  passwordRepeatValidator
};
