import { BadRequestException, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectRepository } from '../../object/object.repository';
import { objNotFoundMsg } from '@app/common/utils';
import * as uuid from 'uuid';

export class ObjectExistGuard implements CanActivate {
  constructor(
    @InjectRepository(ObjectRepository)
    private objectRepository: ObjectRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;

    const isUUID = uuid.validate(id);
    if (!isUUID) {
      throw new BadRequestException('Validation failed (uuid v4 is expected)');
    }
    return this.validateObj(id);
  }

  private async validateObj(id: string) {
    const object = await this.objectRepository.findOne(id);
    if (!object) {
      throw new NotFoundException(objNotFoundMsg(id));
    }

    return true;
  }
}
