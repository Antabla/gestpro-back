import { IProject } from '../interface/project.interface';
import { ITask } from '../interface/task.interface';

export abstract class TaskRepository {
  abstract save(task: ITask): Promise<void>;
  abstract list(projectId: IProject['id']): Promise<ITask[]>;
  abstract delete(id): Promise<void>;
}
