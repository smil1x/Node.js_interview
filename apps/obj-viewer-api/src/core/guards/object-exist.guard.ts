import { BadRequestException, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectRepository } from '../../object/object.repository';
import { objNotFoundMsg } from '@app/common/utils';
import { CreateTaskDto } from '../../tasks/dto';
import { validate } from 'class-validator';

export class ObjectExistGuard implements CanActivate {
  constructor(
    @InjectRepository(ObjectRepository)
    private objectRepository: ObjectRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id || request.body.objectId;
    const dto = new CreateTaskDto();
    dto.objectId = id;
    const errs = await validate(dto, { skipMissingProperties: true });

    if (errs.length) {
      const errsMsg = errs.reduce((acc, { constraints }): string[] => {
        return [...acc, Object.values(constraints)];
      }, []);
      throw new BadRequestException(errsMsg);
    }
    return this.validateObj(id);
  }

  private async validateObj(id: string) {
    const object = await this.objectRepository.getObject(id);
    if (!object) {
      throw new NotFoundException(objNotFoundMsg(id));
    }

    return true;
  }
}
