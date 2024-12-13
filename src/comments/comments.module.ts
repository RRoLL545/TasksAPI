import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from "./comment.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    SequelizeModule.forFeature([
      Comment,
    ]),
    AuthModule,
  ],
  exports: [
    CommentsService,
  ],
})
export class CommentsModule {}
