import { usersSeed } from '../src/users/seed/usersSeed';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../src/auth/auth.module';
import * as request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../src/config/configuration';
import { TokenDto } from '../src/auth/dto/token';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: 'db/db.sqlite',
          autoLoadEntities: true,
        }),
        AuthModule,
      ],
      providers: [ConfigService, JwtService],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = moduleFixture.get<JwtService>(JwtService);
    await app.init();
  });

  it('should return an access_token', async () => {
    const loginDto = {
      username: usersSeed[0].username,
      password: usersSeed[0].password,
    };
    return request(app.getHttpServer())
      .post('/auth')
      .send(loginDto)
      .expect(200)
      .expect((res) => {
        const token = res.body as TokenDto;
        expect(token.accessToken).toBeDefined();
        const decodedToken = jwtService.decode(token.accessToken);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(decodedToken['username']).toEqual(loginDto.username);
      });
  });
});
