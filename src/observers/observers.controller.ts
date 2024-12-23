import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse, ApiTags,
} from "@nestjs/swagger";
import { ObserversService } from "./observers.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ValidationPipe } from "../pipes/validation.pipe";
import { Observer } from "./observer.model";
import { CreateObserverDto } from "./dto/create-observer.dto";

@ApiTags('Наблюдатели')
@ApiBearerAuth('JWT-auth')
@Controller('observers')
export class ObserversController {

  constructor(
    private readonly _observersService: ObserversService,
  ) {}

  @ApiOperation({
    summary: 'Создание наблюдателя'
  })
  @ApiResponse({
    status: 201,
    type: Observer,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/create')
  public create(
    @Body() observerDto: CreateObserverDto,
    @Req() req: any,
  ) {
    return this._observersService.createObserver(observerDto);
  }
}
