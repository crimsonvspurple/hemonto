import { Test, TestingModule } from '@nestjs/testing';
import { UsersControllerV1 } from './users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersControllerV1;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersControllerV1],
      providers: [
        UsersService,
        ConfigService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UsersControllerV1>(UsersControllerV1);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(usersService).toBeDefined();
  });
});
