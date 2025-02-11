import { LoggerRepository } from 'src/common/domain/repository/logger.repository';
import { UIDRepository } from 'src/common/domain/repository/uid.repository';
import { EStatusTask } from 'src/project/domain/enum/status-task.enum';
import { ITask } from 'src/project/domain/interface/task.interface';
import { TaskRepository } from 'src/project/domain/repository/task.repository';

export class SaveTaskUsecase {
  constructor(
    private readonly logger: LoggerRepository,
    private readonly taskRepo: TaskRepository,
    private readonly uidRepo: UIDRepository,
  ) {}

  async execute(xReqUid: string, task: ITask): Promise<void> {
    try {
      if (!task.id) task.id = this.uidRepo.generate();
      if (!task.status) task.status = EStatusTask.TODO;

      this.logger.debug(xReqUid, 'Saving task with data ', task);

      await this.taskRepo.save(task);
    } catch (error) {
      this.logger.error(xReqUid, 'Error saving task', error.messageI);
      throw error;
    }
  }
}
