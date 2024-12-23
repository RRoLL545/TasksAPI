import {
  Controller,
  Get,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { GetTasksService } from "./get-tasks.service";
import { Task } from "../tasks/task.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Получение задач по параметрам')
@ApiBearerAuth('JWT-auth')
@Controller('get-tasks')
export class GetTasksController {

  constructor(
    private _getTasksService: GetTasksService,
  ) {}

  @ApiOperation({
    summary: 'Получение списка задач, в которые пользователь назначен ответственным'
  })
  @ApiResponse({
    status: 200,
    type: Task,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get('/responsible/:id')
  public getTasksByResponsible(@Param('id') id: number): Promise<Task[]> {
    return this._getTasksService.getTasksByResponsible(id);
  }

  @ApiOperation({
    summary: 'Получение списка задач, в которые пользователь назначен наблюдателем'
  })
  @ApiResponse({
    status: 200,
    type: Task,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get('/observer/:id')
  public getTasksByObserver(@Param('id') id: number): Promise<Task[]> {
    return this._getTasksService.getTasksByObserver(id);
  }

  @ApiOperation({
    summary: 'Получение списка задач с определённым статусом'
  })
  @ApiResponse({
    status: 200,
    type: Task,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get('/status/:id')
  public getTaskByStatus(@Param('id') id: number): Promise<Task[]> {
    return this._getTasksService.getTaskByStatus(id);
  }

  @ApiOperation({
    summary: 'Получение списка всех задач'
  })
  @ApiResponse({
    status: 200,
    type: Task,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get('/all')
  public getAllTasks(): Promise<Task[]> {
    return this._getTasksService.getAllTasks();
  }

  @ApiOperation({
    summary: 'Получение задачи по идентификатору'
  })
  @ApiResponse({
    status: 200,
    type: Task,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get('/:id')
  public getTaskById(@Param('id') id: number): Promise<Task> {
    return this._getTasksService.getTaskById(id);
  }
}
