import { Module } from '@nestjs/common';
import { CommonInfrastructure } from './common/infrastructure/common.infrastructure';
import { UserInfrastructure } from './user/infrastructure/user.infrastructure';

@Module({
  imports: [],
  controllers: [
    ...UserInfrastructure.controllers(),
    // ...ProjectInfrastructure.controllers()
  ],
  providers: [
    ...CommonInfrastructure.getInstance().providers(),
    ...UserInfrastructure.getInstance(CommonInfrastructure.getInstance()).providers(),
    // ...ProjectMockInfrastructure.getInstance(CommonMockInfrastructure.getInstance()).providers(),
  ],
})
export class AppModule {}
