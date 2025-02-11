import { Provider } from '@nestjs/common';
import { CommonMockInfrastructure } from 'src/common/infrastructure/common.infrastructure.mock';
import { LoginUserUsecase } from '../application/login-user-usecase/login-user.usecase';
import { SaveUserUsecase } from '../application/save-user-usecase/save-user.usecase';
import { UserRepository } from '../domain/repository/user.repository';
import { InMemoryUserAdapter } from './__mocks__/in-memory-user.repository';
import { UserController } from './controllers/user.controller';

export class UserMockInfrastructure {
  private static instance: UserMockInfrastructure;

  public readonly userRepo: UserRepository;
  public readonly loginUserUsecase: LoginUserUsecase;
  public readonly saveUserUsecase: SaveUserUsecase;

  private constructor(common: CommonMockInfrastructure) {
    this.userRepo = new InMemoryUserAdapter();

    this.loginUserUsecase = new LoginUserUsecase(common.loggerRepo, common.hashRepo, common.jwtRepo, this.userRepo);

    this.saveUserUsecase = new SaveUserUsecase(common.loggerRepo, common.hashRepo, this.userRepo, common.uIdRepo);
  }

  static getInstance(common: CommonMockInfrastructure): UserMockInfrastructure {
    if (!UserMockInfrastructure.instance) {
      UserMockInfrastructure.instance = new UserMockInfrastructure(common);
    }

    return UserMockInfrastructure.instance;
  }

  static controllers(): any[] {
    return [UserController];
  }

  providers(): Provider[] {
    return [
      {
        provide: UserRepository,
        useValue: this.userRepo,
      },
      {
        provide: LoginUserUsecase,
        useValue: this.loginUserUsecase,
      },
      {
        provide: SaveUserUsecase,
        useValue: this.saveUserUsecase,
      },
    ];
  }
}
