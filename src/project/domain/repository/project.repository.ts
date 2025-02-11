import { IUser } from 'src/user/domain/interface/user.interface';
import { IProject } from '../interface/project.interface';

export abstract class ProjectRepository {
  abstract save(project: IProject): Promise<void>;
  abstract list(userId: IUser['id']): Promise<IProject[]>;
  abstract get(id: IProject['id']): Promise<IProject>;
  abstract delete(id): Promise<void>;
}
