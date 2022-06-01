import { OmitType, PartialType } from '@nestjs/swagger';
import { ObjectPostDto } from './object.post.dto';

export class ObjectPatchDto extends OmitType(PartialType(ObjectPostDto), ['metadata'] as const) {}
