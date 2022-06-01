import { Injectable, CanActivate, ExecutionContext, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { ObjectRepository } from '../../object/object.repository';
import { CreateTaskDto } from '../dto';

@Injectable()
export class TaskBodyParametersGuard implements CanActivate {
  constructor(
    @InjectRepository(ObjectRepository)
    private objectRepository: ObjectRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { objectId, parameters } = request.body;
    if (!parameters) {
      throw new BadRequestException('Parameters should not be null or undefined');
    }
    const dto = new CreateTaskDto();
    dto.parameters = parameters;

    const errs = await validate(dto, { skipMissingProperties: true });
    if (errs.length) {
      const errsMsg = errs.reduce((acc, { constraints }): string[] => {
        return [...acc, Object.values(constraints)];
      }, []);
      throw new BadRequestException(errsMsg);
    }

    return parameters.length === 0 ? true : this.validateParameters(objectId, parameters);
  }

  async validateParameters(objectId, parameters) {
    const parametersInContentSchema = await this.objectRepository.checkParametersInContentSchema(objectId, parameters);

    if (!parametersInContentSchema) {
      throw new NotFoundException('The specified parameters are not found in the object content');
    }
    return true;
  }
}
