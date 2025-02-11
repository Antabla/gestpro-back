import { LoggerRepository } from 'src/common/domain/repository/logger.repository';
import { ProjectsUserNotFoundError } from 'src/project/domain/error/projects-user-not-found.error';
import { IProject } from 'src/project/domain/interface/project.interface';
import { ProjectRepository } from 'src/project/domain/repository/project.repository';
import { IUser } from 'src/user/domain/interface/user.interface';

export class ListProjectsUsecase {
  constructor(
    private readonly logger: LoggerRepository,
    private readonly projectRepo: ProjectRepository,
  ) {}

  async execute(xReqUid: string, userId: IUser['id']): Promise<IProject[]> {
    try {
      this.logger.debug(xReqUid, 'Listing projects of user ' + userId);

      const projects = await this.projectRepo.list(userId);

      if (!projects) throw new ProjectsUserNotFoundError(userId);

      return projects;
    } catch (error) {
      this.logger.error(xReqUid, 'Error listing projects of the user ' + userId, error.message);
      throw error;
    }
  }
}
