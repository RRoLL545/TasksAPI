import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { CreateStatusDto } from "./dto/create-status.dto";
import { Status } from "./status.model";

@Injectable()
export class StatusService {

  constructor(
    @InjectModel(Status) private _statusRepository: typeof Status,
  ) {}

  /**
   * Создаёт "Статус" в базе данных
   * @param dto - данные статуса
   */
  public async createStatus(dto: CreateStatusDto): Promise<Status> {
    return await this._statusRepository.create(dto);
  }

  /**
   * Возвращает статус из БД по его идентификатору
   * @param id - идентификатор статуса
   */
  public async getStatusById(id: number): Promise<Status> {
    const status = await this._statusRepository.findByPk(id);
    if (!status)
      throw new HttpException(
        'Статус с таким идентификатором не найден',
        HttpStatus.NOT_FOUND,
      );
    return status;
  }
}
