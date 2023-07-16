import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date',nullable:true })
  date: Date;

  @Column({ type: 'date',nullable:true })
  valueDate: Date;

  @Column({nullable:true})
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
  creditDebit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 ,nullable:true})
  balance: number;

  @Column({nullable:true})
  reference: string;

  @Column({nullable:true})
  commission: string;

  @Column({nullable:true})
  channel: string;
  
  @Column({default:'any'})
  category:string
}
