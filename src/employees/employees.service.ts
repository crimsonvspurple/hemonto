import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { employeesSeed } from './seed/employeesSeed';
import SummaryStatisticsDto, {
  SummaryStatisticsDepartmentDto,
  SummaryStatisticsSubDepartmentDto,
} from './dto/summary-statistics.dto';
import { Department } from './entities/department';
import { SubDepartment } from './entities/sub-department';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>, // injecting repo using TypeORM
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = Employee.fromDto(createEmployeeDto);
    return this.repository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.repository.find(); // TODO: add pagination
  }

  async findOne(id: string): Promise<Employee | null> {
    return this.repository.findOneBy({ id });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    throw new NotImplementedException();
  }

  /**
   * this function should return true if deletion was successful
   * should return false if deletion was unsuccessful
   * should return false if the record was not found
   */
  async remove(id: string): Promise<boolean> {
    const result: DeleteResult = await this.repository.delete(id);
    if (!result.affected) {
      // we are unable to tell if the record was deleted or not (without checking the database)
      return false;
    }
    return result.affected > 0;
  }

  async removeAll() {
    return this.repository.clear();
  }

  async seed() {
    // loop on seed and create all employees
    return this.repository.save(
      employeesSeed.map((employee) => Employee.fromDto(employee)),
    );
  }

  async summaryStatistics(contractOnly = false): Promise<SummaryStatisticsDto> {
    const where: FindOptionsWhere<Employee> = {};
    if (contractOnly) {
      where.onContract = true;
    }

    return (
      (await this.repository
        .createQueryBuilder()
        .select('avg(salary)', 'mean')
        .addSelect('min(salary)', 'min')
        .addSelect('max(salary)', 'max')
        .where(where)
        .getRawOne()) ?? {
        mean: Number.NaN,
        min: Number.NaN,
        max: Number.NaN,
      }
    );
  }

  async summaryStatisticsDepartment() {
    /**
     *  We could have queried all employees and then loop on them but that would be inefficient and slow; especially if we have a lot of employees
     *  Instead, we can utilize SQL functions and get the summary statistics for each department directly
     *  This is much faster and concise comparatively
     */

    const result: any[] = await this.repository
      .createQueryBuilder()
      .select('department', 'department')
      .addSelect('avg(salary)', 'mean')
      .addSelect('min(salary)', 'min')
      .addSelect('max(salary)', 'max')
      .groupBy('department')
      .getRawMany();

    const out: SummaryStatisticsDepartmentDto =
      {} as SummaryStatisticsDepartmentDto;

    // generate the output object with dummy in-case we have no employees
    for (const key in Department) {
      out[key as Department] = {
        mean: Number.NaN,
        min: Number.NaN,
        max: Number.NaN,
      };
    }

    if (result.length > 0) {
      result.forEach((row) => {
        out[row.department as Department] = {
          mean: row.mean,
          min: row.min,
          max: row.max,
        };
      });
    }
    return out;
  }

  async summaryStatisticsSubDepartment() {
    const result: any[] = await this.repository
      .createQueryBuilder()
      .select('department', 'department')
      .addSelect('subDepartment', 'subDepartment')
      .addSelect('avg(salary)', 'mean')
      .addSelect('min(salary)', 'min')
      .addSelect('max(salary)', 'max')
      .groupBy('department, subDepartment')
      .getRawMany();

    const out: SummaryStatisticsSubDepartmentDto =
      {} as SummaryStatisticsSubDepartmentDto;

    // generate the output object with dummy in-case we have no employees
    for (const key in Department) {
      out[key as Department] = {} as Record<
        SubDepartment,
        SummaryStatisticsDto
      >;
      for (const subKey in SubDepartment) {
        out[key as Department][subKey as SubDepartment] = {
          mean: Number.NaN,
          min: Number.NaN,
          max: Number.NaN,
        };
      }
    }

    if (result.length > 0) {
      result.forEach((row) => {
        out[row.department as Department][row.subDepartment as SubDepartment] =
          {
            mean: row.mean,
            min: row.min,
            max: row.max,
          };
      });
    }
    return out;
  }
}
