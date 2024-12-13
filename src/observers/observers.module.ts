import {
  forwardRef,
  Module,
} from '@nestjs/common';
import { ObserversController } from './observers.controller';
import { ObserversService } from './observers.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { TasksModule } from "../tasks/tasks.module";
import { Observer } from "./observer.model";

@Module({
  controllers: [ObserversController],
  providers: [ObserversService],
  imports: [
    SequelizeModule.forFeature([
      Observer,
    ]),
    forwardRef(() => TasksModule),
    AuthModule,
    UsersModule,
  ],
  exports: [ObserversService],
})
export class ObserversModule {}
