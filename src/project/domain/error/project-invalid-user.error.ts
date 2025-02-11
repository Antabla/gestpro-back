import { IUser } from 'src/user/domain/interface/user.interface';
import { IProject } from '../interface/project.interface';

export class ProjectInvalidUserError extends Error {
  constructor(userId: IUser['id'], projectId: IProject['id']) {
    super(`Invalid user ${userId}, not is the owner of the project ${projectId}`);
  }
}
