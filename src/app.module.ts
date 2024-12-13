import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StatusModule } from './status/status.module';
import { TasksModule } from './tasks/tasks.module';
import { GetTasksModule } from './get-tasks/get-tasks.module';
import { CommentsModule } from './comments/comments.module';
import { ObserversModule } from './observers/observers.module';
import * as process from "node:process";
import { User } from "./users/user.model";
import { Status } from "./status/status.model";
import { Task } from "./tasks/task.model";
import { Comment } from "./comments/comment.model";
import { Observer } from "./observers/observer.model";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Status,
        Task,
        Comment,
        Observer,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    StatusModule,
    TasksModule,
    CommentsModule,
    ObserversModule,
    GetTasksModule,
  ],
})
export class AppModule {}