import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';

@Controller({ path: 'employees', version: '1' })
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
  @ApiOperation({ summary: 'View an employee by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the employee' })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an employee by ID',
    description: 'Not implemented yet',
  })
  update(
    @Param('id') id: string,
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
  @ApiResponse({
    status: 400,
    content: undefined,
    description: 'Error encountered during deletion.',
  })
  async remove(
    @Param('id') id: string,
    @Response({ passthrough: true }) res: Res,
  ) {
    if (await this.employeesService.remove(id)) {
      res.status(204); // 204 No Content for successful deletion
    } else {
      res.status(400); // 400 Bad Request for unsuccessful deletion
    }
    return;
  }

  @ApiOperation({
    summary:
      'WARNING: Truncates the table/Deletes all employees. It here for convenience.',
  })
  @Delete()
  @HttpCode(204)
  async removeAll() {
    return this.employeesService.removeAll();
  }
}
