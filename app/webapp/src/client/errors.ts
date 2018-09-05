class FrontendError extends Error {}

class ComponentError extends FrontendError {}

class OfflineError extends FrontendError {
  public constructor(msg: string) {
    super(msg);
  }
}
