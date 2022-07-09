import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { LocalSerializer } from './local.serializer';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthenticationService, LocalStrategy, LocalSerializer],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
