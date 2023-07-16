import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditCardDto } from './create-credit_card.dto';

export class UpdateCreditCardDto extends PartialType(CreateCreditCardDto) {}
