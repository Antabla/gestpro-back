export class UserDuplicatedError extends Error {
  constructor() {
    super(`the username is already user`);
  }
}
