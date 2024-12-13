import { Injectable } from '@nestjs/common';
import { ObserversService } from "../observers/observers.service";
import { TasksService } from "../tasks/tasks.service";
import { UsersService } from "../users/users.service";
import { StatusService } from "../status/status.service";
import { Task } from "../tasks/task.model";

@Injectable()
export class GetTasksService {

  constructor(
    private _observersService: ObserversService,
    private _tasksService: TasksService,
    private _usersService: UsersService,
    private _statusService: StatusService,
  ) {}


  /**
   * Возвращает список задач у которых пользователь назначен ответственным
   * @param id - идентификатор ответственного
   */
  public async getTasksByResponsible(id: number): Promise<Task[]> {
    const user = await this._usersService.getUserById(id);
    return await this._tasksService.getTaskByColumnId({responsible_id: user.id});
  }

  /**
   * Возвращает список задач у которых пользователь назначен наблюдателем
   * @param id - идентификатор наблюдателя
   */
  public async getTasksByObserver(id: number): Promise<Task[]> {
    const user = await this._usersService.getUserById(id);
    const observers = await this._observersService.getObserversByUserId(user.id);
    const taskIds: number[] = observers.map(observer => observer.task_id);
    return await this._tasksService.getTaskByColumnId({id: taskIds});
  }

  /**
   * Возвращает список задач с определённым статусом
   * @param id - идентификатор статуса
   */
  public async getTaskByStatus(id: number): Promise<Task[]> {
    const status = await this._statusService.getStatusById(id);
    return await this._tasksService.getTaskByColumnId({status_id: status.id});
  }

  /**
   * Возвращает все задачи
   */
  public async getAllTasks(): Promise<Task[]> {
    return await this._tasksService.getAllTasks();
  }

  /**
   * Возвращает задачу из базы по идентификатору
   * @private
   * @param id - идентификатор задачи
   */
  public async getTaskById(id: number): Promise<Task> {
    return await this._tasksService.getTaskById(id);
  }
}
