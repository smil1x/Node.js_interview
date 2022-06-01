import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateObjectDto } from './create-object.dto';

export class UpdateObjectDto extends PartialType(
  OmitType(CreateObjectDto, ['id', 'file']),
) {}
