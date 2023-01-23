import { Currency } from '../entities/currency';
import { Department } from '../entities/department';
import { SubDepartment } from '../entities/sub-department';
import {
  IsBooleanString,
  IsEnum,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;
  // @IsNumber() // ideally, we should be using this
  @IsNumberString() // but given sample has numbers as string (!)
  salary: number;
  @IsEnum(Currency)
  currency: Currency;
  @IsBooleanString()
  on_contract?: boolean = false; // keeping this snake_case in-case some automated testing is applied
  @IsEnum(Department)
  department: Department;
  @IsEnum(SubDepartment)
  sub_department: SubDepartment; // keeping snake_case
}
