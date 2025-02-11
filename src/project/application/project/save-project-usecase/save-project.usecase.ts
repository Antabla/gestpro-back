import { LoggerRepository } from 'src/common/domain/repository/logger.repository';
import { UIDRepository } from 'src/common/domain/repository/uid.repository';
import { IProject } from 'src/project/domain/interface/project.interface';
import { ProjectRepository } from 'src/project/domain/repository/project.repository';
import { IUser } from 'src/user/domain/interface/user.interface';

export class SaveProjectUsecase {
  constructor(
    private readonly logger: LoggerRepository,
    private readonly projectRepo: ProjectRepository,
    private readonly uidRepo: UIDRepository,
  ) {}

  async execute(xReqUid: string, userId: IUser['id'], project: IProject): Promise<void> {
    try {
      if (!project.id) project.id = this.uidRepo.generate();
      if (!project.owner) project.owner = userId;

      this.logger.debug(xReqUid, 'Saving project with data ', project);

      await this.projectRepo.save(project);
    } catch (error) {
      this.logger.error(xReqUid, 'Error saving project', error.messageI);
      throw error;
    }
  }
}
