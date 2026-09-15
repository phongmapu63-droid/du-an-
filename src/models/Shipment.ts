import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  shipperId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'shipperId' })
  shipper!: User;

  @Column()
  pickupAddress!: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  pickupLocation!: string;

  @Column()
  dropoffAddress!: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  dropoffLocation!: string;

  @Column({ type: 'float' })
  weightTons!: number;

  @Column({ type: 'float', nullable: true })
  volumeCbm!: number;

  @Column()
  cargoType!: string;

  @Column()
  requiredContType!: string;

  @Column({ type: 'timestamp' })
  pickupTimeWindow!: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  offeredPrice!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
