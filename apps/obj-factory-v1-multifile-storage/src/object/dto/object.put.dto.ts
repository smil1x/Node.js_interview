import { OmitType } from '@nestjs/swagger';
import { ObjectPostDto } from './object.post.dto';

export class ObjectPutDto extends OmitType(ObjectPostDto, ['metadata'] as const) {}
