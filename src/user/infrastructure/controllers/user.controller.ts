import { Body, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/common/domain/interface/response.interface';
import { XReqUid } from 'src/common/infrastructure/decorator/x-req.uid.decorator';
import { AuthInterceptor } from 'src/common/infrastructure/interceptor/auth.interceptor';
import { LoginUserUsecase } from 'src/user/application/login-user-usecase/login-user.usecase';
import { SaveUserUsecase } from 'src/user/application/save-user-usecase/save-user.usecase';
import { UserInvalidError } from 'src/user/domain/error/user-invalid.error';
import { UserNotFoundError } from 'src/user/domain/error/user-not-found.error';
import { IUser, IUserWithToken } from 'src/user/domain/interface/user.interface';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(
    private readonly loginUserUsecase: LoginUserUsecase,
    private readonly saveUserUsecase: SaveUserUsecase,
  ) {}

  @Post('')
  @UseInterceptors(AuthInterceptor)
  async save(@XReqUid() xReqUid: string, @Body('user') user: IUser): Promise<IResponse<null>> {
    try {
      await this.saveUserUsecase.execute(xReqUid, user);
      return {
        status: HttpStatus.OK,
      };
    } catch {
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
    @Body('passwordI') password: string,
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
