import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { UsersService } from "../users/users.service";
import { TasksService } from "../tasks/tasks.service";
import { Observer } from "./observer.model";
import { CreateObserverDto } from "./dto/create-observer.dto";

@Injectable()
export class ObserversService {

  constructor(
    @InjectModel(Observer) private _observerRepository: typeof Observer,
    private _usersService: UsersService,
    private _tasksService: TasksService,
  ) {}

  /**
   * Создаёт наблюдателя
   * @param dto - данные для создания
   */
  public async createObserver(dto: CreateObserverDto): Promise<Observer> {
    const task = await this._tasksService.getTaskById(dto.taskId);
    const user = await this._usersService.getUserById(dto.userId);
    const candidate = await this._observerRepository.findOne({
      where: {
        observer_id: dto.userId,
        task_id: dto.taskId,
      },
      rejectOnEmpty: false,
    });

    if (candidate)
      throw new HttpException(
        'Пользователь с таким идентификатором уже назначен на эту задачу наблюдателем',
        HttpStatus.NOT_FOUND,
      );

    return await this._observerRepository.create({
      observer_id: user.id,
      task_id: task.id,
    });
  }

  /**
   * Возвращает записи по идентификатору пользователя
   * @param id - идентификатор пользователя
   */
  public async getObserversByUserId(id: number): Promise<Observer[]> {
    return await this._observerRepository.findAll({
      where: {
        observer_id: id,
      }
    });
  }
}
