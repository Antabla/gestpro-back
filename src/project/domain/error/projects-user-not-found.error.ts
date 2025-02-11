import { IUser } from 'src/user/domain/interface/user.interface';

export class ProjectsUserNotFoundError extends Error {
  constructor(userId: IUser['id']) {
    super(`project not found of the user ${userId}`);
  }
}
