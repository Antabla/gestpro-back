import { LoggerRepository } from 'src/common/domain/repository/logger.repository';
import { IProject } from 'src/project/domain/interface/project.interface';
import { ProjectRepository } from 'src/project/domain/repository/project.repository';
import { IUser } from 'src/user/domain/interface/user.interface';

export class SaveProjectUsecase {
  constructor(
    private readonly logger: LoggerRepository,
    private readonly projectRepo: ProjectRepository,
  ) {}

  async execute(xReqUid: string, userId: IUser['id'], project: IProject): Promise<void> {
    project.owner = userId;
    this.logger.debug(xReqUid, 'Saving project with data ', project);

    try {
      await this.projectRepo.save(project);
    } catch (error) {
      this.logger.error(xReqUid, 'Error saving project', error.messageI);
      throw error;
    }
  }
}
