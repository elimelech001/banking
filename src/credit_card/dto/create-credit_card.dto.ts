import {
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateCreditCardDto {
  @IsNotEmpty()
  @IsString()
  card: string;

  @IsNotEmpty()
  @IsString()
  business: string;

  @IsNotEmpty()
  @IsDateString()
  transactionDate: Date;

  @IsNotEmpty()
  @IsNumber()
  transactionAmount: number;

  @IsNotEmpty()
  @IsString()
  issuer: string;

  @IsNotEmpty()
  @IsString()
  transactionType: string;

  @IsNotEmpty()
  @IsString()
  details: string;

  @IsNotEmpty()
  @IsDateString()
  chargeDate: Date;

  @IsNotEmpty()
  @IsNumber()
  chargeAmount: number;

  @IsOptional()
  @IsString()
  wasCardPresented: string;

  @IsOptional()
  @IsString()
  transactionCurrency: string;

  @IsOptional()
  @IsNumber()
  exchangeRate: number;

  @IsOptional()
  @IsDateString()
  exchangeRateDate: Date;

  @IsOptional()
  @IsNumber()
  exchangeFee: number;

  @IsOptional()
  @IsString()
  basicIndex: string;

  @IsOptional()
  @IsString()
  clubName: string;

  @IsOptional()
  @IsNumber()
  discountPercentage: number;

  @IsOptional()
  @IsNumber()
  discountAmount: number;
}
