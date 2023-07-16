// import { ConfigModule, ConfigService } from '@nestjs/config';
require('dotenv').config();

import {
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Balance } from 'src/balance/entities/balance.entity';
import { CreditCard } from 'src/credit_card/entities/credit_card.entity';


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: process.env.DB_TYPE as any, 
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT, 
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    entities: [CreditCard,Balance],
    synchronize: true,
    logging: true,
};