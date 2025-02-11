import { JwtRepository } from 'src/common/domain/repository/jwt.repository';

export class JwtMockAdapter implements JwtRepository {
  create(payload: any): string {
    payload.valid = true;
    return JSON.stringify(payload);
  }

  verify(token: string) {
    try {
      const payload = JSON.parse(token);

      if (!payload.valid) {
        throw new Error('Invalid token');
      }

      return payload;
    } catch {
      throw new Error('Error validating token');
    }
  }
}
