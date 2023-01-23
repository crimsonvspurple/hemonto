import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;
  @Column()
  lastName: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @VersionColumn()
  version: number;

  // TODO: improve to support update DTO too
  public static fromDto(dto: CreateUserDto): User {
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.username = dto.username;
    // user.password = dto.password; // password should be set from outside (service domain)
    return user;
  }
}
