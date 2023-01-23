import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../config/configuration';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthControllerV1 } from './auth.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configuration().jwt.secret, // need a better way to load this
      signOptions: {
        expiresIn: configuration().jwt.expiresIn,
        algorithm: configuration().jwt.algorithm as any,
      },
    }),
  ],
  providers: [AuthService, ConfigService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthControllerV1],
})
export class AuthModule {}
