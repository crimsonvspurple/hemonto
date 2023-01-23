import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { usersSeed } from './seed/usersSeed';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = User.fromDto(createUserDto);
    // password should be hashed before saving to database
    console.log('rounds: ', this.configService.get<number>('bcrypt.rounds'));
    user.password = await bcrypt.hash(
      createUserDto.password,
      this.configService.get<number>('bcrypt.rounds') ?? 10,
    );
    return this.repository.save(user).catch((err) => {
      console.log(err);
      throw new BadRequestException('username already exists');
    });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }
  async findOne(username: string): Promise<User | null> {
    return this.repository.findOne({ where: { username } });
  }

  async seed(): Promise<User[]> {
    await this.removeAll(); // clear user table first
    const rounds = this.configService.get<number>('bcrypt.rounds') ?? 10;
    return this.repository.save(
      usersSeed.map((user) => {
        const userEntity: User = User.fromDto(user);
        userEntity.password = bcrypt.hashSync(user.password, rounds);
        return userEntity;
      }),
    );
  }

  async removeAll() {
    return this.repository.clear();
  }
}
