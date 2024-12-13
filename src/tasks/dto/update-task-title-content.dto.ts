import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateTaskTitleContentDto {

  @ApiProperty({
    example: 545,
    description: 'Идентификатор задачи',
  })
  @IsNumber(
    {},
    {message: 'Должно быть числом'}
  )
  readonly id: number;

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
  @IsOptional()
  readonly content?: string | null;
}