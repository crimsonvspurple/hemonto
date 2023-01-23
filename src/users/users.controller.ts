import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller({ path: 'users', version: '1' })
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersControllerV1 {
  constructor(private readonly usersService: UsersService) {}

  @Post('seed')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Generate users from a seed file',
    description: 'Clears table first',
  })
  @ApiResponse({
    status: 204,
    content: undefined,
    description: 'Seed has been successful',
  })
  seed() {
    return this.usersService.seed();
  }

  @Get()
  @ApiOperation({
    summary: 'Lists all users in database',
    description: 'No pagination support yet',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary:
      'WARNING: Truncates the table/Deletes all users. It is here for convenience.',
  })
  @Delete()
  @HttpCode(204)
  async removeAll() {
    return this.usersService.removeAll();
  }
}
