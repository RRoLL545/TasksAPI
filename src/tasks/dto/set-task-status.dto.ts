import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class SetTaskStatusDto {

  @ApiProperty({
    example: 545,
    description: 'Идентификатор задачи',
  })
  @IsNumber(
    {},
    {message: 'Должно быть числом'}
  )
  readonly taskId: number;

  @ApiProperty({
    example: 545,
    description: 'Идентификатор статуса',
  })
  @IsNumber(
    {},
    {message: 'Должно быть числом'}
  )
  readonly statusId: number;

}