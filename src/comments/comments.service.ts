import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "./comment.model";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentsService {

  constructor(
    @InjectModel(Comment) private _commentRepository: typeof Comment,
  ) {}

  /**
   * Создаёт комментарий
   * @param dto - данные для создания комментария
   * @param author_id - идентификатор автора комментария
   */
  public async createComment(
    dto: CreateCommentDto,
    author_id: number,
  ) {
    return await this._commentRepository.create({
      ...dto,
      author_id,
    });
  }
}
