import { Logger } from '@nestjs/common';
import { NestLoggerAdapter } from './nest-logger.adapter';

describe('NestLoggerAdapter', () => {
  let loggerAdapter: NestLoggerAdapter;
  let logger: Logger;

  beforeEach(() => {
    loggerAdapter = new NestLoggerAdapter();
    logger = new Logger(NestLoggerAdapter.name);
  });

  it('should call logger.debug with correct arguments', () => {
    const debugSpy = jest.spyOn(logger, 'debug').mockImplementation();
    const reqUiId = '12345';
    const message = 'This is a debug message';

    loggerAdapter.debug(reqUiId, message);

    expect(debugSpy).toHaveBeenCalledWith(`[${reqUiId}]`, message);
  });

  it('should call logger.error with correct arguments', () => {
    const errorSpy = jest.spyOn(logger, 'error').mockImplementation();
    const reqUiId = '12345';
    const message = 'This is an error message';

    loggerAdapter.error(reqUiId, message);

    expect(errorSpy).toHaveBeenCalledWith(`[${reqUiId}]`, message);
  });
});
