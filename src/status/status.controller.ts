import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { StatusService } from "./status.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ValidationPipe } from "../pipes/validation.pipe";
import { CreateStatusDto } from "./dto/create-status.dto";
import { Status } from "./status.model";

@ApiTags('Статусы')
@ApiBearerAuth('JWT-auth')
@Controller('status')
export class StatusController {

  constructor(
    private readonly _statusService: StatusService,
  ) {}

  @ApiOperation({
    summary: 'Создание статуса'
  })
  @ApiResponse({
    status: 201,
    type: Status,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/create')
  public create(@Body() statusDto: CreateStatusDto): Promise<Status> {
    return this._statusService.createStatus(statusDto);
  }
}
