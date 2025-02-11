export abstract class JwtRepository {
  abstract create(payload: any): string;
  abstract verify(token: string): any;
}
