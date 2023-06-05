import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Content = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // Check if the request is an HTTP request or microservice message
    if (request) {
      return request.body;
    } else {
      const packet = ctx.switchToRpc().getData();
      return packet.data;
    }
  },
);
