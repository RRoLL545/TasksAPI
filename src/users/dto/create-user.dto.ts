import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  Length,
} from "class-validator";

export class CreateUserDto {

  @ApiProperty({
    example: 'LoL',
    description: 'Логин пользователя',
  })
  @IsString({
    message: 'Должно быть строкой',
  })
  readonly login: string;

  @ApiProperty({
    example: 'LoooL',
    description: 'Пароль пользователя',
  })
  @IsString({
    message: 'Должно быть строкой',
  })
  @Length(
    4,
    16,
    {
      message: 'Не менее 4 и не более 16 символов'
    }
  )
  readonly password: string;
}