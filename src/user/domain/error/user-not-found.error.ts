export class UserNotFoundError extends Error {
  constructor(username: string) {
    super(`user not found with username ${username}`);
  }
}
