import { BadRequestException, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectRepository } from '../../object/object.repository';
import { validate } from 'class-validator';
import { UpdateContentDto } from '../../object/dto';

export class ContentRowExistGuard implements CanActivate {
  constructor(
    @InjectRepository(ObjectRepository)
    private objectRepository: ObjectRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const objectId = request.params.id;
    const contentId = request.body.contentId || Number(request.params.contentId);

    const dto = new UpdateContentDto();
    dto.contentId = contentId;
    const errs = await validate(dto, { skipMissingProperties: true });

    if (errs.length) {
      const errsMsg = errs.reduce((acc, { constraints }): string[] => {
        return [...acc, Object.values(constraints)];
      }, []);
      throw new BadRequestException(errsMsg);
    }
    return this.validateContentRow(objectId, contentId);
  }

  private async validateContentRow(objectId: string, contentId: number) {
    const contentColumnName = await this.objectRepository.getContentColumnName(objectId);
    const findContentRowQueryParams = [objectId, contentColumnName, contentId];
    const foundRow = await this.objectRepository.findContentRow(findContentRowQueryParams);
    if (foundRow.length === 0) {
      throw new NotFoundException(`Row with contentId: ${contentId} doesn't exist`);
    }
    return true;
  }
}
