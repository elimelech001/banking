import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typorm.config';
import { BalanceModule } from './balance/balance.module';
import { CreditCardModule } from './credit_card/credit_card.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BalanceModule,
    CreditCardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
