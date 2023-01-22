import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Currency } from './Currency';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  salary: number;

  @Column({ type: 'simple-enum', enum: Currency })
  currency: Currency;

  @Column({ default: false })
  onContract: boolean; // deviating from snake_case to camelCase intentionally

  @Column()
  department: string;

  @Column()
  subDepartment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @VersionColumn()
  version: number;
}
