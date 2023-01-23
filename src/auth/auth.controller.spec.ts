import { Test, TestingModule } from '@nestjs/testing';
import { AuthControllerV1 } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthControllerV1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthControllerV1],
    }).compile();

    controller = module.get<AuthControllerV1>(AuthControllerV1);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
