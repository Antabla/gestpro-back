import { Provider } from '@nestjs/common';
import { HashRepository } from '../domain/repository/hash.repository';
import { JwtRepository } from '../domain/repository/jwt.repository';
import { LoggerRepository } from '../domain/repository/logger.repository';
import { UIDRepository } from '../domain/repository/uid.repository';
import { HashMockAdapter } from './__mocks__/hash-mock.adapter';
import { JwtMockAdapter } from './__mocks__/jwt-mock.adapter';
import { NestLoggerAdapter } from './adapters/logger/nest-logger.adapter';
import { UIDAdapter } from './adapters/uuid/uuid.adapter';

export class CommonMockInfrastructure {
  private static instance: CommonMockInfrastructure;

  public readonly loggerRepo: LoggerRepository;
  public readonly jwtRepo: JwtRepository;
  public readonly hashRepo: HashRepository;
  public readonly uIdRepo: UIDRepository;

  private constructor() {
    this.loggerRepo = new NestLoggerAdapter();
    this.jwtRepo = new JwtMockAdapter();
    this.hashRepo = new HashMockAdapter();
    this.uIdRepo = new UIDAdapter();
  }

  static getInstance(): CommonMockInfrastructure {
    if (!CommonMockInfrastructure.instance) {
      CommonMockInfrastructure.instance = new CommonMockInfrastructure();
    }

    return CommonMockInfrastructure.instance;
  }

  providers(): Provider[] {
    return [
      {
        provide: LoggerRepository,
        useValue: this.loggerRepo,
      },
      {
        provide: JwtRepository,
        useValue: this.jwtRepo,
      },
      {
        provide: HashRepository,
        useValue: this.hashRepo,
      },
      {
        provide: UIDRepository,
        useValue: this.uIdRepo,
      },
    ];
  }
}
