import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { CreditCardService } from './credit_card.service';
import { CreateCreditCardDto } from './dto/create-credit_card.dto';
import { UpdateCreditCardDto } from './dto/update-credit_card.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './file_upload/fileUploadDto';

@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() fileUploadDto: FileUploadDto) {
    await this.creditCardService.create(fileUploadDto);
    return { message: 'File has been uploaded and processed.' };
  }
  @Get()
  findAll() {
    return this.creditCardService.findAll();
  }
  @Get('filterdData')
  findFilterdData(
    @Param('id') id: string,
    @Query('buisness') buisness: string,
    @Query('category') category: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('details') details: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.creditCardService.findFilterdData(
      category,
      start,
      end,
      buisness,
      details
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditCardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() category: any) {
    return this.creditCardService.update(+id, category);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditCardService.remove(+id);
  }
}
