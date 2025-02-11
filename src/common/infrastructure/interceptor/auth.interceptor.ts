import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { IResponse } from 'src/common/domain/interface/response.interface';
import { JwtRepository } from 'src/common/domain/repository/jwt.repository';
import { IUser } from 'src/user/domain/interface/user.interface';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly jwtRepo: JwtRepository) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
      const response: IResponse<null> = {
        status: 401,
        message: 'No token provided',
      };
      return throwError(() => new UnauthorizedException(response));
    }

    try {
      const dataToken = this.jwtRepo.verify(token);

      request.params['userId'] = (dataToken as IUser).id;
    } catch {
      const response: IResponse<null> = {
        status: 401,
        message: 'Unauthorized',
      };
      return throwError(() => new UnauthorizedException(response));
    }
    return next.handle();
  }
}
