import { Provider } from '@nestjs/common';
import { CommonInfrastructure } from 'src/common/infrastructure/common.infrastructure';
import { LoginUserUsecase } from '../application/login-user-usecase/login-user.usecase';
import { SaveUserUsecase } from '../application/save-user-usecase/save-user.usecase';
import { UserRepository } from '../domain/repository/user.repository';
import { DynamoUserAdapter } from './adapters/dynamodb-user.adapter';
import { UserController } from './controllers/user.controller';

export class UserInfrastructure {
  private static instance: UserInfrastructure;

  public readonly userRepo: UserRepository;
  public readonly loginUserUsecase: LoginUserUsecase;
  public readonly saveUserUsecase: SaveUserUsecase;

  private constructor(common: CommonInfrastructure) {
    this.userRepo = new DynamoUserAdapter();

    this.loginUserUsecase = new LoginUserUsecase(common.loggerRepo, common.hashRepo, common.jwtRepo, this.userRepo);

    this.saveUserUsecase = new SaveUserUsecase(common.loggerRepo, common.hashRepo, this.userRepo, common.uIdRepo);
  }

  static getInstance(common: CommonInfrastructure): UserInfrastructure {
    if (!UserInfrastructure.instance) {
      UserInfrastructure.instance = new UserInfrastructure(common);
    }

    return UserInfrastructure.instance;
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
