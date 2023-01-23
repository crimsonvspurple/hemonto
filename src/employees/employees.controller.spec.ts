import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesControllerV1 } from './employees.controller';
import { EmployeesService } from './employees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

describe('EmployeesController', () => {
  let controller: EmployeesControllerV1;
  let employeesService: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesControllerV1],
      providers: [
        EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<EmployeesControllerV1>(EmployeesControllerV1);
    employeesService = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(employeesService).toBeDefined();
  });
});
