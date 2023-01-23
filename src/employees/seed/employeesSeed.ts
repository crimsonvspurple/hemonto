import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Currency } from '../entities/currency';
import { Department } from '../entities/department';
import { SubDepartment } from '../entities/sub-department';

export const employeesSeed: CreateEmployeeDto[] = [
  {
    name: 'Abhishek',
    salary: 145000,
    currency: Currency.USD,
    department: Department.Engineering,
    sub_department: SubDepartment.Platform,
  },
  {
    name: 'Anurag',
    salary: 90000,
    currency: Currency.USD,
    department: Department.Banking,
    on_contract: true,
    sub_department: SubDepartment.Loan,
  },
  {
    name: 'Himani',
    salary: 240000,
    currency: Currency.USD,
    department: Department.Engineering,
    sub_department: SubDepartment.Platform,
  },
  {
    name: 'Yatendra',
    salary: 30,
    currency: Currency.USD,
    department: Department.Operations,
    sub_department: SubDepartment.CustomerOnboarding,
  },
  {
    name: 'Ragini',
    salary: 30,
    currency: Currency.USD,
    department: Department.Engineering,
    sub_department: SubDepartment.Platform,
  },
  {
    name: 'Nikhil',
    salary: 110000,
    currency: Currency.USD,
    on_contract: true,
    department: Department.Engineering,
    sub_department: SubDepartment.Platform,
  },
  {
    name: 'Guljit',
    salary: 30,
    currency: Currency.USD,
    department: Department.Administration,
    sub_department: SubDepartment.Agriculture,
  },
  {
    name: 'Himanshu',
    salary: 70000,
    currency: Currency.EUR,
    department: Department.Operations,
    sub_department: SubDepartment.CustomerOnboarding,
  },
  {
    name: 'Anupam',
    salary: 200000000,
    currency: Currency.INR,
    department: Department.Engineering,
    sub_department: SubDepartment.Platform,
  },
];
