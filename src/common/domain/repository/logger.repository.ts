export abstract class LoggerRepository {
  abstract debug(reqUiId: string, ...args: unknown[]): void;
  abstract error(reqUiId: string, ...args: unknown[]): void;
}
