import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from './entities/balance.entity';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
  ) {}
 async create(fileUploadDto) {
    if (!fileUploadDto) {
      throw new BadRequestException('File not provided!');
    }
    const workbook = XLSX.read(fileUploadDto.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet, { raw: false });
    const existingCategories = await this.balanceRepository
    .createQueryBuilder('balance')
    .select(['balance.description', 'balance.category'])
    .getRawMany();

  const businessToCategory = new Map(
    existingCategories.map((record) => [
      record.balance_description,
      record.balance_category,
    ]),
  );
      const balances=  data.map((row: any) => {
      const balance = new Balance();
      balance.category = businessToCategory.get(row['description']); // Assign the category
      balance.date = new Date(row['Date']);
      balance.valueDate = new Date(row['Value date']);
      balance.description = row['Description'];
      balance.creditDebit = Number(
        row['₪ Credit/Debit'],
      );
      balance.balance = Number(
        row['₪ NIS Balance']?.replace(',', '.'),
      );
      balance.reference = row['Reference'];
      balance.commission = row['Commission'];
      balance.channel = row['Channel'];
 
      return balance
    });
    return this.balanceRepository.save(balances);
  }

  findAll() {
    return `This action returns all balance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} balance`;
  }

  update(id: number, updateBalanceDto: UpdateBalanceDto) {
    return `This action updates a #${id} balance`;
  }

  remove(id: number) {
    return `This action removes a #${id} balance`;
  }
}
