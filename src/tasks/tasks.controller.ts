import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TasksService } from "./tasks.service";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ValidationPipe } from "../pipes/validation.pipe";
import { Task } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskTitleContentDto } from "./dto/update-task-title-content.dto";
import { SetTaskResponsibleDto } from "./dto/set-task-responsible.dto";
import { SetTaskStatusDto } from "./dto/set-task-status.dto";

@ApiTags('Задачи')
@Controller('task')
export class TasksController {

  constructor(
    private readonly _tasksService: TasksService,
  ) {}

  @ApiOperation({
    summary: 'Создание задачи'
  })
  @ApiResponse({
    status: 201,
    type: Task,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/create')
  public create(
    @Body() taskDto: CreateTaskDto,
    @Req() req: any,
  ): Promise<Task> {
    return this._tasksService.createTask(
      taskDto,
      req.user.id,
    );
  }

  @ApiOperation({
    summary: 'Изменение заголовка и содержимого задачи'
  })
  @ApiResponse({
    status: 200,
    type: Task,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/update-title-content')
  public updateTitleContent(
    @Body() taskDto: UpdateTaskTitleContentDto,
    @Req() req: any,
  ): Promise<Task> {
    return this._tasksService.updateTaskTitleAndContent(
      taskDto,
      req.user.id,
    );
  }

  @ApiOperation({
    summary: 'Удаление задачи'
  })
  @ApiResponse({
    status: 200,
    type: Number,
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  public deleteTask(
    @Param('id') id: number,
    @Req() req: any,
  ): Promise<number> {
    return this._tasksService.deleteTask(
      id,req.user.id,
    );
  }

  @ApiOperation({
    summary: 'Назначение ответственного за задачу'
  })
  @ApiResponse({
    status: 200,
    type: Task,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/set-responsible')
  public setTaskResponsible(
    @Body() responsibleDto: SetTaskResponsibleDto,
    @Req() req: any,
  ): Promise<Task> {
    return this._tasksService.setTaskResponsible(
      responsibleDto,
      req.user.id,
    );
  }

  @ApiOperation({
    summary: 'Назначение статуса задачи'
  })
  @ApiResponse({
    status: 200,
    type: Task,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/set-status')
  public setTaskStatus(
    @Body() statusDto: SetTaskStatusDto,
    @Req() req: any,
  ): Promise<Task> {
    return this._tasksService.setTaskStatus(
      statusDto,
      req.user.id,
    );
  }
}
