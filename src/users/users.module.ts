import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersRepoService } from './repo/users-repo.service';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepoService]
})
export class UsersModule {}
