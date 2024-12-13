import { Module } from '@nestjs/common';
import { GetTasksService } from './get-tasks.service';
import { GetTasksController } from './get-tasks.controller';
import { TasksModule } from "../tasks/tasks.module";
import { ObserversModule } from "../observers/observers.module";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";
import { StatusModule } from "../status/status.module";

@Module({
  providers: [GetTasksService],
  controllers: [GetTasksController],
  imports: [
    TasksModule,
    ObserversModule,
    UsersModule,
    AuthModule,
    StatusModule,
  ],
})
export class GetTasksModule {}
