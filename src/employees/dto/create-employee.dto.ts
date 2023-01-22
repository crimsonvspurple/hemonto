import { Currency } from '../entities/Currency';

export class CreateEmployeeDto {
  name: string;
  salary: number;
  currency: Currency;
  onContract?: boolean;
  department: string;
  subDepartment: string;
}
