import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { EmployeesModule } from '../src/employees/employees.module';
import { employeesSeed } from '../src/employees/seed/employeesSeed';
import { Employee } from '../src/employees/entities/employee.entity';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usersSeed } from '../src/users/seed/usersSeed';
import { TokenDto } from '../src/auth/dto/token';
import { AuthModule } from '../src/auth/auth.module';

describe('EmployeeController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  const testEmployee = employeesSeed[0]; // use faker in future

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
        EmployeesModule,
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
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
        authToken = token.accessToken;
      });
  });

  it('will clear employee table', () => {
    return request(app.getHttpServer())
      .delete('/employees')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204);
  });
  it('will check if employee table is empty', () => {
    return request(app.getHttpServer())
      .get('/employees')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect([]);
  });

  let employeeId: string;
  it('will create a employee', () => {
    return request(app.getHttpServer())
      .post('/employees')
      .set('Authorization', `Bearer ${authToken}`)
      .send(testEmployee)
      .expect(201)
      .expect((res) => {
        const employee = res.body as Employee;
        expect(employee.id).toBeDefined();
        employeeId = employee.id;
      });
  });

  it('will delete the employee', () => {
    return request(app.getHttpServer())
      .delete(`/employees/${employeeId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204);
  });

  it('will seed employees', () => {
    return request(app.getHttpServer())
      .post('/employees/seed')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204);
  });

  it('will count seeded employees', () => {
    return request(app.getHttpServer())
      .get('/employees')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        const employees = res.body as Employee[];
        expect(employees.length).toBeGreaterThan(8);
      });
  });

  it('will check for SSE', () => {
    return request(app.getHttpServer())
      .get('/employees/summary-statistics')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    // we can further validate data if math is right if really needed
  });
  it('will check for SSE (contract)', () => {
    return request(app.getHttpServer())
      .get('/employees/summary-statistics/contract')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });
  it('will check for SSE (department)', () => {
    return request(app.getHttpServer())
      .get('/employees/summary-statistics/department')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });
  it('will check for SSE (sub-department)', () => {
    return request(app.getHttpServer())
      .get('/employees/summary-statistics/sub-department')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });
});
