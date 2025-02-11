import { LoggerRepository } from 'src/common/domain/repository/logger.repository';
import { IProject } from 'src/project/domain/interface/project.interface';
import { ITask } from 'src/project/domain/interface/task.interface';
import { TaskRepository } from 'src/project/domain/repository/task.repository';

export class ListTasksUsecase {
  constructor(
    private readonly logger: LoggerRepository,
    private readonly taskRepo: TaskRepository,
  ) {}

  async execute(xReqUid: string, projectId: IProject['id']): Promise<ITask[]> {
    try {
      this.logger.debug(xReqUid, 'Listing tasks of the project ' + projectId);

      const tasks = await this.taskRepo.list(projectId);

      return tasks;
    } catch (error) {
      this.logger.error(xReqUid, 'Error listing tasks of the project ' + projectId, error.message);
      throw error;
    }
  }
}
