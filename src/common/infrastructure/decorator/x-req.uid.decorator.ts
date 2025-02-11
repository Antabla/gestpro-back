import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export const XReqUid = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  let xReqUid = request.headers['x-requid'];

  if (!xReqUid) {
    xReqUid = uuidv4();
  }

  return xReqUid;
});
