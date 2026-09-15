import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { EmptyTrip } from './EmptyTrip';
import { Shipment } from './Shipment';
import { BookingStatus } from '../constants/enums';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  tripId!: string;

  @ManyToOne(() => EmptyTrip)
  @JoinColumn({ name: 'tripId' })
  trip!: EmptyTrip;

  @Column()
  shipmentId!: string;

  @ManyToOne(() => Shipment)
  @JoinColumn({ name: 'shipmentId' })
  shipment!: Shipment;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  agreedPrice!: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status!: BookingStatus;

  @Column({ nullable: true })
  podImageUrl!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
