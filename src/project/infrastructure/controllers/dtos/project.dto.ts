import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProjectDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
