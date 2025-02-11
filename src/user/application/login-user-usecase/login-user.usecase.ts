import { HashRepository } from 'src/common/domain/repository/hash.repository';
import { JwtRepository } from 'src/common/domain/repository/jwt.repository';
import { LoggerRepository } from 'src/common/domain/repository/logger.repository';
import { UserInvalidError } from 'src/user/domain/error/user-invalid.error';
import { UserNotFoundError } from 'src/user/domain/error/user-not-found.error';
import { IUserWithToken } from 'src/user/domain/interface/user.interface';
import { UserRepository } from 'src/user/domain/repository/user.repository';

export class LoginUserUsecase {
  constructor(
    private readonly loggerRepo: LoggerRepository,
    private readonly hashRepo: HashRepository,
    private readonly jwtRepo: JwtRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(xReqId: string, username: string, password: string): Promise<IUserWithToken> {
    try {
      this.loggerRepo.debug(xReqId, 'Get user by username ' + username);

      const user = await this.userRepo.getByUsername(username);

      if (!user) throw new UserNotFoundError(username);

      if (!this.hashRepo.compareHash(password, user.password)) {
        throw new UserInvalidError();
      }

      const token = this.jwtRepo.create(user);
      return { id: user.id, username: user.username, token };
    } catch (error) {
      this.loggerRepo.error('Error on login user', error.message);
      throw error;
    }
  }
}
