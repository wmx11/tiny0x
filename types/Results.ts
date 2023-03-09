import { ErrorMessage } from './Errors';

export type ResultsOrError<T> =
  | { ok: true; results: T }
  | ({ ok: false } & ErrorMessage);
