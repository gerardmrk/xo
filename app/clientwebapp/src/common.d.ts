declare type ErrorFirstCallback<T = never, E extends Error = Error> = (
  error: E | null,
  payload?: T
) => void;
