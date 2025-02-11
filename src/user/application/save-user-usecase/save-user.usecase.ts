import { InternalServerErrorException } from '@nestjs/common';
import { HashRepository } from 'src/common/domain/repository/hash.repository';
import { LoggerRepository } from 'src/common/domain/repository/logger.repository';
import { UIDRepository } from 'src/common/domain/repository/uid.repository';
import { IUser } from 'src/user/domain/interface/user.interface';
import { UserRepository } from 'src/user/domain/repository/user.repository';

export class SaveUserUsecase {
  constructor(
    private readonly loggerRepo: LoggerRepository,
    private readonly hashRepo: HashRepository,
    private readonly userRepo: UserRepository,
    private readonly uidRepo: UIDRepository,
  ) {}

  async execute(xReqId: string, user: IUser): Promise<void> {
    try {
      if (!user.id) user.id = this.uidRepo.generate();
      this.loggerRepo.debug(xReqId, 'Saving user with data', user);

      user.password = this.hashRepo.hash(user.password);

      await this.userRepo.save(user);
    } catch (error) {
      this.loggerRepo.error(xReqId, 'Error saving user', error.message);
      throw new InternalServerErrorException('Error saving user');
    }
  }
}
