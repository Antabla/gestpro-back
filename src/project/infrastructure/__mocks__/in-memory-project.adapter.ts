import { IProject } from 'src/project/domain/interface/project.interface';
import { ProjectRepository } from 'src/project/domain/repository/project.repository';
import { IUser } from 'src/user/domain/interface/user.interface';

export class InMemoryProjectAdapter implements ProjectRepository {
  private readonly projects: Map<string, IProject> = new Map<string, IProject>();

  async save(project: IProject): Promise<void> {
    this.projects.set(project.id, project);
  }

  async list(userId: IUser['id']): Promise<IProject[]> {
    const projects: IProject[] = [];

    this.projects.forEach((p) => {
      if (p.owner == userId) projects.push(p);
    });

    return projects;
  }

  async get(projectId: IProject['id']): Promise<IProject> {
    return this.projects.get(projectId);
  }

  async delete(id: any): Promise<void> {
    this.projects.delete(id);
  }
}
