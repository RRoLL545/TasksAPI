import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/user.model";
import { Status } from "../status/status.model";
import { Comment } from "../comments/comment.model";
import { Observer } from "../observers/observer.model";

/**
 * Интерфейс модели данных для создания задачи
 */
interface ITaskCreate {
  title: string;
  content?: string | null;
  author_id: number;
  responsible_id?: number | null;
  observer_id?: number | null;
  status_id?: number | null;
}

/**
 * Модель "Статус"
 */
@Table({
  tableName: 'tasks',
})
export class Task extends Model<Task, ITaskCreate> {

  @ApiProperty({
    example: 545,
    description: 'Уникальный идентификатор задачи',
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
    description: 'Название задачи',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'LoL',
    description: 'Содержание задачи',
    required: false,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  content: string;

  @ForeignKey(() => User)
  @ApiProperty({
    example: 545,
    description: 'Идентификатор автора задачи',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  author_id: number;

  @ForeignKey(() => User)
  @ApiProperty({
    example: 545,
    description: 'Идентификатор ответственного за задачу',
    required: false,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  responsible_id: number;

  @ForeignKey(() => Status)
  @ApiProperty({
    example: 545,
    description: 'Идентификатор статуса задачи',
    required: false,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  status_id: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsTo(() => User)
  responsible: User;

  @BelongsTo(() => Status)
  status: Status;

  @HasMany(() => Comment)
  comments: Comment;

  @HasMany(() => Observer)
  observers: Observer;
}