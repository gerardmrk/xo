// error-first callback
declare type ErrorFirstCallback<T = never, E extends Error = Error> = (
  error: E | null,
  payload?: T
) => void;

// error levels
declare enum ErrorSeverity {
  Notice,
  Warning,
  Critical,
  Emergency
}

// a translated message
declare type Message = string;

// an object of flattened translated messagess
declare type TranslatedMessages = {
  [MKey: string]: Message;
};

declare class AppError {}
