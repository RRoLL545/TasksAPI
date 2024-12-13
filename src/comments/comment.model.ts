import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/user.model";
import { Task } from "../tasks/task.model";

/**
 * Интерфейс модели данных для создания задачи
 */
interface ICommentCreate {
  content: string;
  author_id: number;
  task_id: number;
}

/**
 * Модель "Статус"
 */
@Table({
  tableName: 'comments',
})
export class Comment extends Model<Comment, ICommentCreate> {

  @ApiProperty({
    example: 545,
    description: 'Уникальный идентификатор комментария',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'LoL',
    description: 'Содержание комментария',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => User)
  @ApiProperty({
    example: 545,
    description: 'Идентификатор автора комментария',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  author_id: number;

  @ForeignKey(() => Task)
  @ApiProperty({
    example: 545,
    description: 'Идентификатор задачи, к которой дан комментарий',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  task_id: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsTo(() => Task)
  task: Task;
}