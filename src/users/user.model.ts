import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Task } from "../tasks/task.model";
import { Comment } from "../comments/comment.model";
import { Observer } from "../observers/observer.model";

/**
 * Интерфейс модели данных для создания пользователя
 */
interface IUserCreate {
  login: string;
  password: string;
}

/**
 * Модель "Пользователь"
 */
@Table({
  tableName: 'users',
})
export class User extends Model<User, IUserCreate> {

  @ApiProperty({
    example: '545',
    description: 'Уникальный идентификатор пользователя',
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
    description: 'Логин пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  login: string;

  @ApiProperty({
    example: 'LoooL',
    description: 'Пароль пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Task)
  tasksAuthor: Task[];

  @HasMany(() => Task)
  tasksResponsible: Task[];

  @HasMany(() => Comment)
  comments: Comment;

  @HasMany(() => Observer)
  observers: Observer;
}