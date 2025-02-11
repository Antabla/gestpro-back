import { HashRepository } from 'src/common/domain/repository/hash.repository';

export class HashMockAdapter implements HashRepository {
  hash(value: string): string {
    return value + 'mock';
  }

  compareHash(value: string, hash: string): boolean {
    if (value + 'mock' === hash) {
      return true;
    }
    return false;
  }
}
