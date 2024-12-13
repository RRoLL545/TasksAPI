import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateStatusDto {

  @ApiProperty({
    example: 'LoL',
    description: 'Возможный статус задачи',
  })
  @IsString({
    message: 'Должно быть строкой',
  })
  readonly title: string;
}