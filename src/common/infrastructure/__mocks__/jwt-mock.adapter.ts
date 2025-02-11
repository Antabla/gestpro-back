import { JwtRepository } from 'src/common/domain/repository/jwt.repository';

export class JwtMockAdapter implements JwtRepository {
  create(payload: any): string {
    console.log(payload);
    return 'tokenmock';
  }

  verify(token: string) {
    if (token != 'tokenmock') {
      throw new Error('Invalid token');
    }

    return { id: 1 };
  }
}
