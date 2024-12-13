import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateObserverDto {

  @ApiProperty({
    example: 545,
    description: 'Идентификатор пользователя, который назначается наблюдатель',
  })
  @IsNumber(
    {},
    {
      message: 'Должно быть числом',
    }
  )
  userId: number;

  @ApiProperty({
    example: 545,
    description: 'Идентификатор задачи, для которой назначается наблюдатель',
  })
  @IsNumber(
    {},
    {
      message: 'Должно быть числом',
    }
  )
  taskId: number;
}