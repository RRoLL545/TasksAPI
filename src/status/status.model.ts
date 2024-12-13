import {
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Интерфейс модели данных для создания статуса
 */
interface IStatusCreate {
  title: string;
}

/**
 * Модель "Статус"
 */
@Table({
  tableName: 'status',
})
export class Status extends Model<Status, IStatusCreate> {

  @ApiProperty({
    example: '545',
    description: 'Уникальный идентификатор статуса',
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
    description: 'Название статуса',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;
}