import {
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.model";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Пользователи')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {

  constructor(
    private readonly _usersService: UsersService,
  ) {}

  @ApiOperation({
    summary: 'Создание пользователя'
  })
  @ApiResponse({
    status: 201,
    type: User,
  })
  @UsePipes(ValidationPipe)
  @Post('/create')
  public create(@Body() userDto: CreateUserDto): Promise<User> {
    return this._usersService.createUser(userDto);
  }
}
