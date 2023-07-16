import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'any' })
  category: string;

  @Column({ nullable: true })
  card: string;

  @Column({ nullable: true })
  business: string;

  @Column({ type: 'date', nullable: true })
  transactionDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  transactionAmount: number;

  @Column({ nullable: true })
  issuer: string;

  @Column({ nullable: true })
  transactionType: string;

  @Column({ nullable: true })
  details: string;

  @Column({ type: 'date', nullable: true })
  chargeDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  chargeAmount: number;

  @Column({ nullable: true })
  wasCardPresented: boolean;

  @Column({ nullable: true })
  transactionCurrency: string;

  @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
  exchangeRate: number;

  @Column({ type: 'date', nullable: true })
  exchangeRateDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  exchangeFee: number;

  @Column({ nullable: true })
  basicIndex: string;

  @Column({ nullable: true })
  clubName: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  discountPercentage: number;
}
