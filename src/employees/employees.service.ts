import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>, // injecting repo using TypeORM
  ) {}

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = new Employee();
    return this.repository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Employee | null> {
    return this.repository.findOneBy({ id: id });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    throw new NotImplementedException();
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
