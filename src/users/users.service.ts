import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";

/**
 * Служба по работе с пользователями
 */
@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private _userRepository: typeof User,
  ) {}

  /**
   * Создаёт пользователя в БД
   * @param dto - данные пользователя
   */
  public async createUser(dto: CreateUserDto): Promise<User> {
    return await this._userRepository.create(dto);
  }

  /**
   * Возвращает данные пользователя из БД по его логину
   * @param login - логин пользователя
   */
  public async getUserByLogin(login: string): Promise<User> {
    return  await this._userRepository
      .findOne({
        rejectOnEmpty: false,
        where: {login},
      });
  }

  /**
   * Возвращает данные пользователя из БД по его идентификатору
   * @param id - идентификатор пользователя
   */
  public async getUserById(id: number): Promise<User> {
    const user = await this._userRepository.findByPk(id);
    if (!user)
      throw new HttpException(
        'Пользователь с таким идентификатором не найден',
        HttpStatus.NOT_FOUND,
      );
    return user;
  }
}
