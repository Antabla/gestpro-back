import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { IResponse } from 'src/common/domain/interface/response.interface';
import { XReqUid } from 'src/common/infrastructure/decorator/x-req.uid.decorator';
import { AuthInterceptor } from 'src/common/infrastructure/interceptor/auth.interceptor';
import { DeleteProjectUsecase } from 'src/project/application/project/delete-project-usecase/delete-project.usecase';
import { ListProjectsUsecase } from 'src/project/application/project/list-projects-usecase/list-projects.usecase';
import { SaveProjectUsecase } from 'src/project/application/project/save-project-usecase/save-project.usecase';
import { DeleteTaskUsecase } from 'src/project/application/task/delete-task-usecase/delete-task.usecase';
import { ListTasksUsecase } from 'src/project/application/task/list-tasks-usecase/list-tasks.usecase';
import { SaveTaskUsecase } from 'src/project/application/task/save-task-usecase/save-task.usecase';
import { ProjectInvalidUserError } from 'src/project/domain/error/project-invalid-user.error';
import { ProjectsUserNotFoundError } from 'src/project/domain/error/projects-user-not-found.error';
import { IProject } from 'src/project/domain/interface/project.interface';
import { ITask } from 'src/project/domain/interface/task.interface';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly deleteProjectUsecase: DeleteProjectUsecase,
    private readonly listProjectUsecase: ListProjectsUsecase,
    private readonly saveProjectUsecase: SaveProjectUsecase,
    private readonly deleteTaskUsecase: DeleteTaskUsecase,
    private readonly listTaskUsecase: ListTasksUsecase,
    private readonly saveTaskUsecase: SaveTaskUsecase,
  ) {}

  @Delete(':projectId')
  @UseInterceptors(AuthInterceptor)
  async deleteProject(
    @XReqUid() xReqUid: string,
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
  ): Promise<IResponse<null>> {
    try {
      await this.deleteProjectUsecase.execute(xReqUid, userId, projectId);
      return {
        status: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof ProjectInvalidUserError) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid user',
        };
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error deleting project user',
      };
    }
  }

  @Get()
  @UseInterceptors(AuthInterceptor)
  async listProjects(@XReqUid() xReqUid: string, @Param('userId') userId: string): Promise<IResponse<IProject[]>> {
    try {
      const projects = await this.listProjectUsecase.execute(xReqUid, userId);
      return {
        status: HttpStatus.OK,
        data: projects,
      };
    } catch (error) {
      if (error instanceof ProjectsUserNotFoundError) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'This user does not have any projects',
        };
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error listing projects of the user',
      };
    }
  }

  @Post()
  @UseInterceptors(AuthInterceptor)
  async saveProject(
    @XReqUid() xReqUid: string,
    @Param('userId') userId: string,
    @Body('project') project: IProject,
  ): Promise<IResponse<null>> {
    try {
      await this.saveProjectUsecase.execute(xReqUid, userId, project);
      return {
        status: HttpStatus.OK,
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error saving project',
      };
    }
  }

  @Delete('tasks/:taskId')
  @UseInterceptors(AuthInterceptor)
  async deleteTask(@XReqUid() xReqUid: string, @Param('taskId') taskId: string): Promise<IResponse<null>> {
    try {
      await this.deleteTaskUsecase.execute(xReqUid, taskId);
      return {
        status: HttpStatus.OK,
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error deleting task',
      };
    }
  }

  @Get('tasks/:projectId')
  @UseInterceptors(AuthInterceptor)
  async listTasks(@XReqUid() xReqUid: string, @Param('projectId') projectId: string): Promise<IResponse<ITask[]>> {
    try {
      const projects = await this.listTaskUsecase.execute(xReqUid, projectId);
      return {
        status: HttpStatus.OK,
        data: projects,
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error listing tasks of the project' + projectId,
      };
    }
  }

  @Post()
  @UseInterceptors(AuthInterceptor)
  async saveTask(@XReqUid() xReqUid: string, @Body('task') task: ITask): Promise<IResponse<null>> {
    try {
      await this.saveTaskUsecase.execute(xReqUid, task);
      return {
        status: HttpStatus.OK,
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error saving task',
      };
    }
  }
}
