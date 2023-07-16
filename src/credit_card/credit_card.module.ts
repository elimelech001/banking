import { Module } from '@nestjs/common';
import { CreditCardService } from './credit_card.service';
import { CreditCardController } from './credit_card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from './entities/credit_card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard])],
  controllers: [CreditCardController],
  providers: [CreditCardService],
})
export class CreditCardModule {}
