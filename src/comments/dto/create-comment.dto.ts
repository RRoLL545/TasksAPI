import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsString,
} from "class-validator";

export class CreateCommentDto {

  @ApiProperty({
    example: 'LoL',
    description: 'Комментарий задачи',
  })
  @IsString({
    message: 'Должно быть строкой',
  })
  readonly content: string;

  @ApiProperty({
    example: 545,
    description: 'Идентификатор задачи, для которой дан комментарий',
  })
  @IsNumber(
    {},
    {
      message: 'Должно быть числом',
    }
  )
  task_id: number;
}