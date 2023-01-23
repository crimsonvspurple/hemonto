import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { TokenDto } from './dto/token';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User | false> {
    const user = await this.usersService.findOne(loginDto.username);
    if (user) {
      if (await bcrypt.compare(loginDto.password, user.password)) {
        return user; // careful about moving around password hash
      }
    }
    return false;
  }

  async login(loginDto: LoginDto): Promise<TokenDto | null> {
    const user = await this.validateUser(loginDto);
    if (user) {
      const payload = { username: user.username, sub: user.id };
      // TODO: base64 encode the token
      // TODO: add refresh_token system
      // TODO: add RBAC
      return { access_token: this.jwtService.sign(payload) };
    }
    return null;
  }
}
