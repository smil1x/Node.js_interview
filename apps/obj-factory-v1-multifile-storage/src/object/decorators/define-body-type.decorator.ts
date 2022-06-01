import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const DefineBodyType = createParamDecorator(async (data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const isMultipartFormDataType = request.headers['content-type'].includes('multipart/form-data');

  const dto = isMultipartFormDataType
    ? plainToClass(data.formDataType, { ...request.body, files: request.files })
    : plainToClass(data.jsonType, request.body);

  const errors = await validate(dto);

  if (errors.length) {
    const errorsMsg = errors.reduce((acc, { constraints }): string[] => {
      return [...acc, ...Object.values(constraints)];
    }, []);
    throw new BadRequestException(errorsMsg);
  }
  return dto;
});
