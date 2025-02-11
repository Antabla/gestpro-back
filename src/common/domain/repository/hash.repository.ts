export abstract class HashRepository {
  abstract hash(value: string): string;
  abstract compareHash(value: string, hash: string): boolean;
}
