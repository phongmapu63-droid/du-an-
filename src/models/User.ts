import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from '../constants/enums';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  phone!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  fullName!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.SHIPPER })
  role!: UserRole;

  @Column({ nullable: true })
  companyName!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
