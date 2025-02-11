import { LoggerRepository } from 'src/common/domain/repository/logger.repository';
import { TaskRepository } from 'src/project/domain/repository/task.repository';

export class DeleteTaskUsecase {
  constructor(
    private readonly logger: LoggerRepository,
    private readonly taskRepo: TaskRepository,
  ) {}

  async execute(xReqUid: string, taskId: string): Promise<void> {
    try {
      this.logger.debug(xReqUid, 'Deleting task with id ' + taskId);

      await this.taskRepo.delete(taskId);
    } catch (error) {
      this.logger.error(xReqUid, 'Error deleting task with id ' + taskId, error.message);
      throw error;
    }
  }
}
