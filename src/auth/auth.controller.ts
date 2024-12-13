import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { TokenDto } from "./dto/token.dto";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly _authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Вход в систему'
  })
  @ApiResponse({
    status: 200,
    type: TokenDto,
  })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this._authService.login(userDto);
  }

  @ApiOperation({
    summary: 'Регистрация нового пользователя'
  })
  @ApiResponse({
    status: 201,
    type: TokenDto,
  })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this._authService.registration(userDto);
  }
}
