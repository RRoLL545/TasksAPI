import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import * as process from "node:process";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/user.model";

@Injectable()
export class AuthService {

  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
    ) {}

  /**
   * Логинит пользователя
   * @param userDto - данные пользователя
   */
  async login(userDto: CreateUserDto){
    const user = await this._validateUser(userDto);
    return this._getToken(user);
  }

  /**
   * Регистрирует нового пользователя
   * @param userDto - данные пользователя
   */
  async registration(userDto: CreateUserDto){
    const candidate = await this._usersService.getUserByLogin(userDto.login);
    if (candidate) throw new HttpException(
      'Пользователь с таким логином не существует',
      HttpStatus.BAD_REQUEST,
    );
    const hashPassword = await bcrypt.hash(
      userDto.password,
      Number(process.env.SALT),
    );
    const user = await this._usersService.createUser({
      ...userDto,
      password: hashPassword,
    })
    return this._getToken(user);
  }

  /**
   * Генерирует и возвращает JWT токен
   * @param user - данные пользователя
   * @private
   */
  private async _getToken(user: User) {
    const payload = {
      login: user.login,
      id: user.id,
    };
    return {
      token: this._jwtService.sign(payload),
    };
  }

  /**
   * Валидирует введённые данные пользователя
   * @param userDto - данные пользователя
   * @private
   */
  private async _validateUser(userDto: CreateUserDto) {
    const user = await this._usersService.getUserByLogin(userDto.login);
    const passwordsEquals = await bcrypt.compare(
      userDto.password,
      user.password,
      );
    if (user && passwordsEquals) return user;
    throw new UnauthorizedException({message: 'Неправильный логин или пароль'});
  }
}
