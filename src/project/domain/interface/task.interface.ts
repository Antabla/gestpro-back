import { EStatusTask } from '../enum/status-task.enum';
import { IProject } from './project.interface';

export interface ITask {
  id?: string;
  projectId: IProject['id'];
  description: string;
  status: EStatusTask;
}
