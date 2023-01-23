import { Test, TestingModule } from '@nestjs/testing';
import { AuthControllerV1 } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthController', () => {
  let controller: AuthControllerV1;
  let authService: AuthService;
  let usersService: UsersService;
  let configService: ConfigService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthControllerV1],
      providers: [
        UsersService,
        AuthService,
        ConfigService,
        JwtService,
        UsersModule,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AuthControllerV1>(AuthControllerV1);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    configService = module.get<ConfigService>(ConfigService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(configService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  // describe('login', () => {
  //   it('should return an access_token', async () => {
  //     const loginDto = {
  //       username: usersSeed[0].username,
  //       password: usersSeed[0].password,
  //     };
  //     const token = (await controller.login(loginDto)).accessToken;
  //     expect(token).toBeDefined();
  //     const decodedToken = jwtService.decode(token);
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     expect(decodedToken['username']).toEqual(loginDto.username);
  //   });
  //  });
});
