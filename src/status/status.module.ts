import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Status } from "./status.model";

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports: [
    SequelizeModule.forFeature([
      Status,
    ]),
    AuthModule,
  ],
  exports: [
    StatusService,
  ],
})
export class StatusModule {}
