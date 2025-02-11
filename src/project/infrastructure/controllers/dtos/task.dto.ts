import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EStatusTask } from 'src/project/domain/enum/status-task.enum';
import { IProject } from 'src/project/domain/interface/project.interface';

export class TaskDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  projectId: IProject['id'];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(EStatusTask)
  status: EStatusTask;
}
