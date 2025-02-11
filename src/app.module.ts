import { Module } from '@nestjs/common';
import { CommonMockInfrastructure } from './common/infrastructure/common.infrastructure.mock';
import { ProjectMockInfrastructure } from './project/infrastructure/project.infrastructure.mock';
import { UserMockInfrastructure } from './user/infrastructure/user.infrastructure.mock';

@Module({
  imports: [],
  controllers: [...UserMockInfrastructure.controllers(), ...ProjectMockInfrastructure.controllers()],
  providers: [
    ...CommonMockInfrastructure.getInstance().providers(),
    ...UserMockInfrastructure.getInstance(CommonMockInfrastructure.getInstance()).providers(),
    ...ProjectMockInfrastructure.getInstance(CommonMockInfrastructure.getInstance()).providers(),
  ],
})
export class AppModule {}
