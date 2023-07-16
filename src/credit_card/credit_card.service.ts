import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCreditCardDto } from './dto/create-credit_card.dto';
import { UpdateCreditCardDto } from './dto/update-credit_card.dto';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { CreditCard } from './entities/credit_card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadDto } from './file_upload/fileUploadDto';
import { Between,Like } from 'typeorm';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

@Injectable()
export class CreditCardService {
  findOne(id: number) {
    return this.creditCardRepository.findOne({ where: { id } });
  }
  constructor(
    @InjectRepository(CreditCard)
    private readonly creditCardRepository: Repository<CreditCard>,
  ) { }
  async create(fileUploadDto) {
    if (!fileUploadDto) {
      throw new BadRequestException('File not provided!');
    }
    const workbook = XLSX.read(fileUploadDto.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet, { raw: false });
    const existingCategories = await this.creditCardRepository
      .createQueryBuilder('credit_card')
      .select(['credit_card.business', 'credit_card.category'])
      .getRawMany();

    // Convert the result into a map for easy access
    const businessToCategory = new Map(
      existingCategories.map((record) => [
        record.credit_card_business,
        record.credit_card_category,
      ]),
    );

    const creditCards: CreditCard[] = data.map((row: any): CreditCard => {
      const creditCard = new CreditCard();
      creditCard.card = row['Card'];
      creditCard.business = row['Business'];
      creditCard.category = businessToCategory.get(row['Business']); // Assign the category
      creditCard.transactionDate = row['Date of transaction'];
      creditCard.transactionAmount = Number(
        row['Amount of transaction']?.substring(1)?.replace(',', '.'),
      );
      creditCard.issuer = row['Issuer'];
      creditCard.transactionType = row['Type of transaction'];
      creditCard.details = row['Details'];
      creditCard.chargeDate = row['Date of charge'];
      creditCard.chargeAmount = Number(
        row['Amount to be charged']?.substring(1)?.replace(',', '.'),
      );
      creditCard.wasCardPresented =
        row['Was a card presented at the point of the transaction?'];
      creditCard.transactionCurrency = row['Transaction currency'];
      creditCard.exchangeRate = row['Exchange rate']
        ? Number(row['Exchange rate']?.replace(',', '.'))
        : null;
      creditCard.exchangeRateDate = row['Exchange rate date']
        ? new Date(row['Exchange rate date'])
        : null;
      creditCard.exchangeFee = row['Exchange fee']
        ? Number(row['Exchange fee']?.replace(',', '.'))
        : null;
      creditCard.basicIndex = row['Basic index'];
      creditCard.clubName = row['Name of club'];
      creditCard.discountPercentage = row['Discount percentage']
        ? Number(row['Discount percentage']?.replace('%', ''))
        : null;
      return creditCard;
    });
    await this.creditCardRepository.save(creditCards);
    return 'This action adds a excell file to ';
  }

  findAll() {
    return this.creditCardRepository.find();
  }

  async findFilterdData(
    category: string | null,
    startDate?: Date,
    endDate?: Date,
    business?: string,
    details?: string
  ) {
    // If no dates are provided, default to the start and end of the last month
    if (!startDate || !endDate) {
      const currentDate = new Date();
      startDate = startOfMonth(subMonths(currentDate, 1));
      endDate = endOfMonth(subMonths(currentDate, 1));
    }

    // Prepare the category filter
    const categoryFilter = category ? { category } : {};
    const buisnessFilter = business ? { business } : {};
    // Find transactions within the date range and with the specified category
    let filterObject = {
      transactionDate: Between(startDate, endDate),
      ...buisnessFilter,
      ...categoryFilter
    }
  
    // If 'details' is provided, add it to the filter
    if (details) {
      filterObject['details'] = Like(`%${details}%`);
    } 
  
    // Find transactions within the date range and with the specified category, business, and details
    const transactions = await this.creditCardRepository.find({
      where: filterObject,
    });
    if (!transactions) {
      throw new Error('No transactions found');
    }

    return transactions;
  }

  async update(id: number, category: any) {
    const creditCard = await this.creditCardRepository.findOne({
      where: { id },
    });
    try {
      if (!creditCard) {
        throw new NotFoundException('CreditCard not found');
      }
      if (!category) {
        throw new NotFoundException('category not found');
      }

      await this.creditCardRepository
        .createQueryBuilder('credit_card')
        .update()
        .set({ category: category.category })
        .where('credit_card.business = :business', {
          business: creditCard.business,
        })
        .execute();

      return `This action updates a #${id} creditCard and others with the same business name`;
    } catch (error) {
      throw new error();
    }
  }

  async remove(id: number) {
    try {
      await this.creditCardRepository.delete(id);
    } catch (error) {
      throw new error();
    }
    return `This action removes a #${id} creditCard`;
  }
}

