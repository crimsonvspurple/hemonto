import { Test, TestingModule } from '@nestjs/testing';
import { UsersControllerV1 } from './users.controller';

describe('UsersController', () => {
  let controller: UsersControllerV1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersControllerV1],
    }).compile();

    controller = module.get<UsersControllerV1>(UsersControllerV1);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
