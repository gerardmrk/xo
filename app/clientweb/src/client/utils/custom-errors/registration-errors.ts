export class RegistrationError extends Error {
  public constructor(message: string) {
    super(message);
  }
}

export class AlreadyRegisteredError extends RegistrationError {
  public constructor() {
    super("Email already exists in our system.");
  }

  public get retryable(): boolean {
    return false;
  }
}
