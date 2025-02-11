import { IProject } from 'src/project/domain/interface/project.interface';
import { ITask } from 'src/project/domain/interface/task.interface';
import { TaskRepository } from 'src/project/domain/repository/task.repository';

export class InMemoryTaskAdapter implements TaskRepository {
  private readonly tasks: Map<string, ITask> = new Map<string, ITask>();

  async save(task: ITask): Promise<void> {
    this.tasks.set(task.id, task);
  }

  async list(projectId: IProject['id']): Promise<ITask[]> {
    const tasks: ITask[] = [];

    this.tasks.forEach((t) => {
      if (t.projectId == projectId) tasks.push(t);
    });

    return tasks;
  }

  async delete(id: any): Promise<void> {
    this.tasks.delete(id);
  }
}
