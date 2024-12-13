import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateTaskDto {

  @ApiProperty({
    example: 'LoL',
    description: 'Название задачи',
  })
  @IsString({
    message: 'Должно быть строкой',
  })
  readonly title: string;

  @ApiProperty({
    example: 'LoL',
    description: 'Содержание задачи',
    required: false,
  })
  @IsString({
    message: 'Должно быть строкой',
  })
  readonly content?: string | null;

  @ApiProperty({
    example: 545,
    description: 'Идентификатор ответственного за задачу',
    required: false,
  })
  @IsNumber(
    {},
    {message: 'Должно быть числом'}
  )
  @IsOptional()
  readonly responsible_id?: number | null;

  // @ApiProperty({
  //   example: 545,
  //   description: 'Идентификатор ответственного за задачу',
  //   required: false,
  // })
  // @IsNumber(
  //   {},
  //   {message: 'Должно быть числом'}
  // )
  // @IsOptional()
  // readonly observer_id?: number | null;

  @ApiProperty({
    example: 545,
    description: 'Идентификатор статуса задачи',
    required: false,
  })
  @IsNumber(
    {},
    {message: 'Должно быть числом'}
  )
  @IsOptional()
  readonly status_id?: number | null;
}