import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';

@Controller({ path: 'employees', version: '1' })
@ApiTags('employees')
export class EmployeesControllerV1 {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('seed')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Generate employees from a seed file',
    description: 'This does not clear table first',
  })
  @ApiResponse({
    status: 204,
    content: undefined,
    description: 'Seed has been successful',
  })
  seed() {
    return this.employeesService.seed();
  }

  @ApiOperation({
    summary: 'SS of all employees in database',
  })
  @Get('summary-statistics')
  summaryStatistics() {
    return this.employeesService.summaryStatistics();
  }

  @ApiOperation({
    summary: 'SS of all `contract` employees in database',
  })
  @Get('summary-statistics/contract')
  summaryStatisticsContract() {
    return this.employeesService.summaryStatistics(true);
  }

  @ApiOperation({
    summary: 'SS of all employees by department',
  })
  @Get('summary-statistics/department')
  summaryStatisticsDepartment() {
    return this.employeesService.summaryStatisticsDepartment();
  }

  @ApiOperation({
    summary: 'SS of all employees by department and sub-department',
  })
  @Get('summary-statistics/sub-department')
  summaryStatisticsSubDepartment() {
    return this.employeesService.summaryStatisticsSubDepartment();
  }

  @Post()
  @ApiOperation({ summary: 'Add an employee' })
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({
    status: 201,
    type: Employee,
    description: 'Employee has been added successfully',
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lists all employees in database',
    description: 'No pagination support yet',
  })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  @ApiOperation({ summary: 'View an employee by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the employee' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Employee | null> {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an employee by ID',
    description: 'Not implemented yet',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto); // 501 Not Implemented
  }

  // noinspection SpellCheckingInspection
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete an employee by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the employee' })
  @ApiResponse({
    status: 204,
    content: undefined,
    description: 'The record was found and deleted successfully.',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    if ((await this.findOne(id)) == null) {
      throw new NotFoundException(); // throw 404 if not found
    }
    return this.employeesService.remove(id);
  }

  @ApiOperation({
    summary:
      'WARNING: Truncates the table/Deletes all employees. It is here for convenience.',
  })
  @Delete()
  @HttpCode(204)
  async removeAll() {
    return this.employeesService.removeAll();
  }
}
