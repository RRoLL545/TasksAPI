import {
  forwardRef,
  Module,
} from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as process from "node:process";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'TOTAL_SECRET',
      signOptions: {
        expiresIn: process.env.TOKEN_LIFETIME || '24h',
      }
    }),
  ],
  exports: [
    AuthService,
    JwtModule,
  ],
})
export class AuthModule {}
