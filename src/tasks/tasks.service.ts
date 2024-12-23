import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { UsersService } from "../users/users.service";
import { StatusService } from "../status/status.service";
import { Task } from "./task.model";
import { User } from "../users/user.model";
import { Observer } from "../observers/observer.model";
import { Comment } from "../comments/comment.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskTitleContentDto } from "./dto/update-task-title-content.dto";
import { SetTaskResponsibleDto } from "./dto/set-task-responsible.dto";
import { SetTaskStatusDto } from "./dto/set-task-status.dto";
import { TTaskColumn } from "./interfaces/task";

@Injectable()
export class TasksService {

  constructor(
    @InjectModel(Task) private _taskRepository: typeof Task,
    private _usersService: UsersService,
    private _statusService: StatusService,
  ) {}

  /**
   * Создаёт задачу
   * @param dto - данные для создания задачи
   * @param author_id - идентификатор автора комментария
   */
  public async createTask(
    dto: CreateTaskDto,
    author_id: number,
  ): Promise<Task> {
    return await this._taskRepository.create({
      ...dto,
      author_id,
    });
  }

  /**
   * Изменяет значения названия и описания задачи
   * @param dto - данные
   * @param id - идентификатор пользователя
   */
  public async updateTaskTitleAndContent(
    dto: UpdateTaskTitleContentDto,
    id: number,
  ): Promise<Task> {
    const task = await this.getTaskById(dto.id);

    task.author.id && this._taskNotAllowedErrorCheck(
          task.author.id,
          id,
        );

    task.title = dto.title;
    if (dto.content) task.content = dto.content;
    await task.save();

    return task;
  }

  /**
   * Назначает ответственного за задачу
   * @param dto - данные
   * @param id - идентификатор пользователя
   */
  public async setTaskResponsible(
    dto: SetTaskResponsibleDto,
    id: number,
  ): Promise<Task> {
    const task = await this.getTaskById(dto.taskId);
    const responsibleUser = dto.responsibleUserId
      ? await this._usersService.getUserById(dto.responsibleUserId)
      : null;
    task.author.id && this._taskNotAllowedErrorCheck(
      task.author.id,
      id,
    );

    task.responsible_id = responsibleUser
      ? responsibleUser.id
      : null;
    await task.save();

    return task;
  }

  /**
   * Назначает статус задачи
   * @param dto - данные
   * @param id - идентификатор пользователя
   */
  public async setTaskStatus(
    dto: SetTaskStatusDto,
    id: number,
  ): Promise<Task> {
    const task = await this.getTaskById(dto.taskId);
    const status = await this._statusService.getStatusById(dto.statusId);
    if (task.author.id !== id && task.responsible.id !== id)
      throw new HttpException(
        'Этому пользователю не позволено изменять эту задачу',
        HttpStatus.METHOD_NOT_ALLOWED,
      );

    task.status_id = status.id;
    await task.save();

    return task;
  }

  /**
   * Удаляет задачу
   * @param taskId - идентификатор задачи
   * @param userId - идентификатор пользователя
   */
  public async deleteTask(
    taskId: number,
    userId: number
  ): Promise<number>{
    const task = await this.getTaskById(taskId);
    task.author.id && this._taskNotAllowedErrorCheck(
      task.author.id,
      userId,
    );
    await task.destroy();

    return taskId;
  }

  /**
   * Возвращает задачу из базы по идентификатору
   * @private
   * @param id - идентификатор задачи
   */
  public async getTaskById(id: number): Promise<Task> {
    const task = await this._taskRepository.findByPk(
      id,
      this._getTaskResponseDataStructure(),
    );
    if (!task)
      throw new HttpException(
        'Задача с таким идентификатором не найдена',
        HttpStatus.NOT_FOUND,
      );
    return task;
  }

  /**
   * Возвращает все задачи
   */
  public async getAllTasks(): Promise<Task[]> {
    return await this._taskRepository.findAll(this._getTaskResponseDataStructure());
  }

  /**
   * Проверяет можно ли пользователю изменять задачу
   * @private
   * @param taskUserId - идентификатор пользователя в задаче
   * @param userId - идентификатор пользователя, который хочет внести изменения
   */
  private _taskNotAllowedErrorCheck(
    taskUserId: number,
    userId: number,
  ): void {
    if (taskUserId !== userId)
      throw new HttpException(
        'Этому пользователю не позволено изменять эту задачу',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
  }

  /**
   * Возвращает список задач по идентификатору определённой колонки
   * @param data - данные
   */
  public async getTaskByColumnId(data: TTaskColumn): Promise<Task[]> {
    return await this._taskRepository.findAll({
      where: data,
      ...this._getTaskResponseDataStructure(),
    });
  }

  /**
   * Возвращает структуру ответа для задач
   * @private
   */
  private _getTaskResponseDataStructure() {
    return {
      include: [
        {
          all: true,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'password',
              'task_id',
            ],
          },
        },
        {
          model: Observer,
          attributes: [
            'id',
          ],
          include: [
            {
              model: User,
              attributes: [
                'id',
                'login',
              ],
            },
          ],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'content',
          ],
          include: [
            {
              model: User,
              attributes: [
                'id',
                'login',
              ],
            },
          ],
        },
      ],
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'author_id',
          'responsible_id',
          'status_id',
        ],
      },
    };
  }
}
