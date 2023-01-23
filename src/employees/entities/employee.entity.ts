import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Currency } from './currency';
import { Department } from './department';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { SubDepartment } from './sub-department';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  salary: number; // deviating from string to number

  @Column({ type: 'simple-enum', enum: Currency })
  currency: Currency;

  @Column({ default: false })
  onContract?: boolean; // deviating from snake_case to camelCase intentionally

  @Column({ type: 'simple-enum', enum: Department })
  department: Department;

  @Column({ type: 'simple-enum', enum: SubDepartment })
  subDepartment: SubDepartment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @VersionColumn()
  version: number;

  // TODO: improve to support update DTO too
  public static fromDto(dto: CreateEmployeeDto): Employee {
    const employee = new Employee();
    employee.name = dto.name;
    employee.salary = +dto.salary; // https://i.stack.imgur.com/LLrgj.png
    employee.currency = dto.currency;
    employee.onContract = dto.on_contract;
    employee.department = dto.department;
    employee.subDepartment = dto.sub_department;
    return employee;
  }
}
