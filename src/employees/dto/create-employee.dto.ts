import { Currency } from '../entities/Currency';

export class CreateEmployeeDto {
  name: string;
  salary: number;
  currency: Currency;
  on_contract?: boolean = false; // keeping this snake_case in-case some automated testing is applied
  department: string;
  sub_department: string; // keeping snake_case
}
