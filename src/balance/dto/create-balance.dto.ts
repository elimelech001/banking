import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateBalanceDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsDateString()
  valueDate: Date;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  creditDebit: number;

  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsNotEmpty()
  reference: string;

  @IsNotEmpty()
  commission: string;

  @IsNotEmpty()
  channel: string;
}
