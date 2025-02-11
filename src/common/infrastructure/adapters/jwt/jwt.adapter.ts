import { JwtRepository } from 'src/common/domain/repository/jwt.repository';
import * as jwt from 'jsonwebtoken';

export class JwtAdapter implements JwtRepository {
  private readonly SECRET = 'MYSECRET';

  create(payload: any): string {
    return jwt.sign(payload, this.SECRET);
  }
  verify(token: string) {
    return jwt.verify(token, this.SECRET);
  }
}
