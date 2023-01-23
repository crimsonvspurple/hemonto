import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { usersSeed } from '../users/seed/usersSeed';
import { TokenDto } from './dto/token';

@Controller({ path: 'auth', version: '1' })
@ApiTags('auth')
export class AuthControllerV1 {
  constructor(private readonly authService: AuthService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Get a new token' })
  @ApiResponse({ status: 200, description: 'Your access_token' })
  @ApiBody({
    type: LoginDto,
    examples: {
      'login-pass': {
        value: {
          username: usersSeed[0].username,
          password: usersSeed[0].password,
        },
      },
      'login-fail': {
        value: {
          username: 'example@example.com',
          password: usersSeed[0].password.concat('fail'),
        },
      },
    },
  })
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    const token = await this.authService.login(loginDto);
    if (!token) {
      throw new UnauthorizedException({
        description: 'Username and/or password is incorrect',
      });
    }
    return token;
  }
}
