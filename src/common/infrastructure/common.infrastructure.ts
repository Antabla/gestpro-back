import { Provider } from '@nestjs/common';
import { HashRepository } from '../domain/repository/hash.repository';
import { JwtRepository } from '../domain/repository/jwt.repository';
import { LoggerRepository } from '../domain/repository/logger.repository';
import { UIDRepository } from '../domain/repository/uid.repository';
import { HashMockAdapter } from './__mocks__/hash-mock.adapter';
import { JwtAdapter } from './adapters/jwt/jwt.adapter';
import { NestLoggerAdapter } from './adapters/logger/nest-logger.adapter';
import { UIDAdapter } from './adapters/uuid/uuid.adapter';

export class CommonInfrastructure {
  private static instance: CommonInfrastructure;

  public readonly loggerRepo: LoggerRepository;
  public readonly jwtRepo: JwtRepository;
  public readonly hashRepo: HashRepository;
  public readonly uIdRepo: UIDRepository;

  private constructor() {
    this.loggerRepo = new NestLoggerAdapter();
    this.jwtRepo = new JwtAdapter();
    this.hashRepo = new HashMockAdapter();
    this.uIdRepo = new UIDAdapter();
  }

  static getInstance(): CommonInfrastructure {
    if (!CommonInfrastructure.instance) {
      CommonInfrastructure.instance = new CommonInfrastructure();
    }

    return CommonInfrastructure.instance;
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
