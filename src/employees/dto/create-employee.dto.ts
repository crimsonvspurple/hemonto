import { Currency } from '../entities/currency';
import { Department } from '../entities/department';
import { SubDepartment } from '../entities/sub-department';

export class CreateEmployeeDto {
  name: string;
  salary: number;
  currency: Currency;
  on_contract?: boolean = false; // keeping this snake_case in-case some automated testing is applied
  department: Department;
  sub_department: SubDepartment; // keeping snake_case
}
