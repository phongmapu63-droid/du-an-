import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  ownerId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner!: User;

  @Column({ unique: true })
  licensePlate!: string; // Biển số xe

  @Column()
  contType!: string; // 20ft, 40ft, 40HC, Cont lạnh...

  @Column({ type: 'float' })
  maxWeight!: number; // Tải trọng tối đa (tấn)

  @CreateDateColumn()
  createdAt!: Date;
}
