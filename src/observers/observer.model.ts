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
 * Интерфейс модели данных для создания наблюдателя
 */
interface IObserverCreate {
  observer_id: number;
  task_id: number;
}

/**
 * Модель "Наблюдатель"
 */
@Table({
  tableName: 'observers',
})
export class Observer extends Model<Observer, IObserverCreate> {

  @ForeignKey(() => User)
  @ApiProperty({
    example: 545,
    description: 'Идентификатор наблюдателя',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  observer_id: number;

  @ForeignKey(() => Task)
  @ApiProperty({
    example: 545,
    description: 'Идентификатор задачи, к которой назначен наблюдатель',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  task_id: number;

  @BelongsTo(() => User)
  observer: User;

  @BelongsTo(() => Task)
  task: Task;
}