import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsOptional} from "class-validator";

export class SetTaskResponsibleDto {

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
    description: 'Идентификатор назначаемого ответственным пользователя',
  })
  @IsNumber(
    {},
    {message: 'Должно быть числом'}
  )
  @IsOptional()
  readonly responsibleUserId: number;

}