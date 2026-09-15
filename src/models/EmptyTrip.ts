import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Vehicle } from './Vehicle';
import { User } from './User';
import { TripStatus } from '../constants/enums';

@Entity('empty_trips')
export class EmptyTrip {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  vehicleId!: string;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicleId' })
  vehicle!: Vehicle;

  @Column()
  driverId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'driverId' })
  driver!: User;

  @Column()
  originAddress!: string;

  // Tọa độ GPS điểm bắt đầu rỗng (PostGIS Geometry Point)
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  originLocation!: string;

  @Column()
  destinationAddress!: string;

  // Tọa độ GPS điểm trả xe/về bãi
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  destinationLocation!: string;

  @Column({ type: 'timestamp' })
  availableTime!: Date;

  @Column({ type: 'enum', enum: TripStatus, default: TripStatus.AVAILABLE })
  status!: TripStatus;

  @CreateDateColumn()
  createdAt!: Date;
}
