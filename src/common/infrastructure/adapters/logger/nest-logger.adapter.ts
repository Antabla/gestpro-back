import { Logger } from '@nestjs/common';
import { LoggerRepository } from '../../../domain/repository/logger.repository';

export class NestLoggerAdapter implements LoggerRepository {
  private readonly logger = new Logger(NestLoggerAdapter.name);

  debug(reqUiId: string, ...args: unknown[]): void {
    this.logger.debug(`[${reqUiId}] - ` + JSON.stringify(args));
  }

  error(reqUiId: string, ...args: unknown[]): void {
    this.logger.error(`[${reqUiId}] - ` + JSON.stringify(args));
  }
}
