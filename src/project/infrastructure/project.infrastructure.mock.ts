import { Provider } from '@nestjs/common';
import { CommonMockInfrastructure } from 'src/common/infrastructure/common.infrastructure.mock';
import { ListProjectsUsecase } from '../application/project/list-projects-usecase/list-projects.usecase';
import { SaveProjectUsecase } from '../application/project/save-project-usecase/save-project.usecase';
import { DeleteTaskUsecase } from '../application/task/delete-task-usecase/delete-task.usecase';
import { ListTasksUsecase } from '../application/task/list-tasks-usecase/list-tasks.usecase';
import { SaveTaskUsecase } from '../application/task/save-task-usecase/save-task.usecase';
import { ProjectRepository } from '../domain/repository/project.repository';
import { TaskRepository } from '../domain/repository/task.repository';
import { DeleteProjectUsecase } from './../application/project/delete-project-usecase/delete-project.usecase';
import { InMemoryProjectAdapter } from './__mocks__/in-memory-project.adapter';
import { InMemoryTaskAdapter } from './__mocks__/in-memory-task.adapter';
import { ProjectController } from './controllers/project.controller';

export class ProjectMockInfrastructure {
  private static instance: ProjectMockInfrastructure;

  public readonly projectRepo: ProjectRepository;
  public readonly taskRepo: TaskRepository;

  public readonly deleteProjectUsecase: DeleteProjectUsecase;
  public readonly listProjectUsecase: ListProjectsUsecase;
  public readonly saveProjectUsecase: SaveProjectUsecase;

  public readonly deleteTaskUsecase: DeleteTaskUsecase;
  public readonly listTaskUsecase: ListTasksUsecase;
  public readonly saveTaskUsecase: SaveTaskUsecase;

  private constructor(common: CommonMockInfrastructure) {
    this.projectRepo = new InMemoryProjectAdapter();
    this.taskRepo = new InMemoryTaskAdapter();

    this.deleteProjectUsecase = new DeleteProjectUsecase(common.loggerRepo, this.projectRepo);
    this.listProjectUsecase = new ListProjectsUsecase(common.loggerRepo, this.projectRepo);
    this.saveProjectUsecase = new SaveProjectUsecase(common.loggerRepo, this.projectRepo);

    this.deleteTaskUsecase = new DeleteTaskUsecase(common.loggerRepo, this.taskRepo);
    this.listTaskUsecase = new ListTasksUsecase(common.loggerRepo, this.taskRepo);
    this.saveTaskUsecase = new SaveTaskUsecase(common.loggerRepo, this.taskRepo);
  }

  static getInstance(common: CommonMockInfrastructure): ProjectMockInfrastructure {
    if (!ProjectMockInfrastructure.instance) {
      ProjectMockInfrastructure.instance = new ProjectMockInfrastructure(common);
    }

    return ProjectMockInfrastructure.instance;
  }

  static controllers(): any[] {
    return [ProjectController];
  }

  providers(): Provider[] {
    return [
      {
        provide: ProjectRepository,
        useValue: this.projectRepo,
      },
      {
        provide: TaskRepository,
        useValue: this.taskRepo,
      },
      {
        provide: SaveProjectUsecase,
        useValue: this.saveProjectUsecase,
      },
      {
        provide: DeleteProjectUsecase,
        useValue: this.deleteProjectUsecase,
      },
      {
        provide: ListProjectsUsecase,
        useValue: this.listProjectUsecase,
      },
      {
        provide: SaveTaskUsecase,
        useValue: this.saveTaskUsecase,
      },
      {
        provide: DeleteTaskUsecase,
        useValue: this.deleteTaskUsecase,
      },
      {
        provide: ListTasksUsecase,
        useValue: this.listTaskUsecase,
      },
    ];
  }
}
