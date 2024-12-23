import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse, ApiTags,
} from "@nestjs/swagger";
import { CommentsService } from "./comments.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ValidationPipe } from "../pipes/validation.pipe";
import { Comment } from "./comment.model";
import { CreateCommentDto } from "./dto/create-comment.dto";

@ApiTags('Комментарии')
@ApiBearerAuth('JWT-auth')
@Controller('comments')
export class CommentsController {

  constructor(
    private readonly _commentsService: CommentsService,
  ) {}

  @ApiOperation({
    summary: 'Создание комментария'
  })
  @ApiResponse({
    status: 201,
    type: Comment,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/create')
  public create(
    @Body() commentDto: CreateCommentDto,
    @Req() req: any,
  ) {
    return this._commentsService.createComment(
      commentDto,
      req.user.id,
    );
  }
}
