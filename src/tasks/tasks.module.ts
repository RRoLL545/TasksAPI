import {
  forwardRef,
  Module,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { StatusModule } from "../status/status.module";
import { ObserversModule } from "../observers/observers.module";
import { Task } from "./task.model";

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    SequelizeModule.forFeature([
      Task,
    ]),
    forwardRef(() => ObserversModule),
    AuthModule,
    UsersModule,
    StatusModule,
  ],
  exports: [
    TasksService,
  ],
})
export class TasksModule {}
