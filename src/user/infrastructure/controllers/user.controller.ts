import { Body, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { IResponse } from 'src/common/domain/interface/response.interface';
import { XReqUid } from 'src/common/infrastructure/decorator/x-req.uid.decorator';
import { AuthInterceptor } from 'src/common/infrastructure/interceptor/auth.interceptor';
import { LoginUserUsecase } from 'src/user/application/login-user-usecase/login-user.usecase';
import { SaveUserUsecase } from 'src/user/application/save-user-usecase/save-user.usecase';
import { UserDuplicatedError } from 'src/user/domain/error/user-duplicated.error';
import { UserInvalidError } from 'src/user/domain/error/user-invalid.error';
import { UserNotFoundError } from 'src/user/domain/error/user-not-found.error';
import { IUserWithToken } from 'src/user/domain/interface/user.interface';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly loginUserUsecase: LoginUserUsecase,
    private readonly saveUserUsecase: SaveUserUsecase,
  ) {}

  @Post('')
  @UseInterceptors(AuthInterceptor)
  async save(@XReqUid() xReqUid: string, @Body('user') user: UserDto): Promise<IResponse<null>> {
    try {
      await this.saveUserUsecase.execute(xReqUid, user);
      return {
        status: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof UserDuplicatedError) {
        return {
          status: HttpStatus.CONFLICT,
          message: 'Username already exists',
        };
      }

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error saving user',
      };
    }
  }

  @Post('login')
  async login(
    @XReqUid() xReqUid: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<IResponse<IUserWithToken>> {
    try {
      const userWithToken = await this.loginUserUsecase.execute(xReqUid, username, password);

      return {
        status: 200,
        data: userWithToken,
      };
    } catch (error) {
      if (error instanceof UserNotFoundError || error instanceof UserInvalidError) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid information',
        };
      }
    }
  }
}
