import { IsNotEmpty } from 'class-validator';
import { File } from 'multer';

export class FileUploadDto {
  @IsNotEmpty()
  path: File;
}
