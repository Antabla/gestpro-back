import { LoggerRepository } from 'src/common/domain/repository/logger.repository';
import { ProjectInvalidUserError } from 'src/project/domain/error/project-invalid-user.error';
import { ProjectRepository } from 'src/project/domain/repository/project.repository';
import { IUser } from 'src/user/domain/interface/user.interface';

export class DeleteProjectUsecase {
  constructor(
    private readonly logger: LoggerRepository,
    private readonly projectRepo: ProjectRepository,
  ) {}

  async execute(xReqUid: string, userId: IUser['id'], projectId: string): Promise<void> {
    try {
      this.logger.debug(xReqUid, 'Deleting project with id ' + projectId);

      const project = await this.projectRepo.get(projectId);

      if (project.owner != userId) {
        throw new ProjectInvalidUserError(userId, projectId);
      }

      await this.projectRepo.delete(projectId);
    } catch (error) {
      this.logger.error(xReqUid, 'Error deleting project with id ' + projectId, error.message);
      throw error;
    }
  }
}
