export class UserInvalidError extends Error {
  constructor() {
    super(`user informations is invalid`);
  }
}
