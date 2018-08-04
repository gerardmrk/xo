export type FieldValidator = (fieldInput: string) => FieldValidationResult;

export interface FieldValidationResult {
  valid: boolean;
  invalidReason?: string;
}
