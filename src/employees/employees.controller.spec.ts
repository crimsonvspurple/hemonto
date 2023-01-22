import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesControllerV1 } from './employees.controller';
import { EmployeesService } from './employees.service';

describe('EmployeesController', () => {
  let controller: EmployeesControllerV1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesControllerV1],
      providers: [EmployeesService],
    }).compile();

    controller = module.get<EmployeesControllerV1>(EmployeesControllerV1);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
