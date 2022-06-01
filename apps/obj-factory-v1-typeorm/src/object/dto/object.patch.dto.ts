import { PartialType } from '@nestjs/swagger';
import { ObjectPostDto } from './object.post.dto';

export class ObjectPatchDto extends PartialType(ObjectPostDto) {}
