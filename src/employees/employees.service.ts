import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>, // injecting repo using TypeORM
  ) {}

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = Employee.fromDto(createEmployeeDto);
    return this.repository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Employee | null> {
    return this.repository.findOneBy({ id: id });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    throw new NotImplementedException();
  }

  // this function should return true if deletion was successful
  // should return false if deletion was unsuccessful
  // should return null if the record was not found
  async remove(id: string): Promise<boolean> {
    const result: DeleteResult = await this.repository.delete(id);
    if (result.affected == null) {
      // we are unable to tell if the record was deleted or not (without checking the database)
      return true;
    }
    if (result.affected === 0) {
      return false;
    }
    return result.affected > 0;
  }
}
