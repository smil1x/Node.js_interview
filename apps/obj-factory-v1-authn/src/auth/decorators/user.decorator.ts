import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((prop: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  return prop ? user?.[prop] : user;
});
