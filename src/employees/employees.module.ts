import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesControllerV1 } from './employees.controller';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesControllerV1],
  providers: [EmployeesService],
})
export class EmployeesModule {}
