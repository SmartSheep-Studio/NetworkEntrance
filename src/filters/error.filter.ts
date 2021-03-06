import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { FastifyReply } from "fastify";

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).send({
      code: exception instanceof HttpException ? exception.message : "InternalServerError",
      data: exception instanceof HttpException ? exception.stack : null,
      timestamp: new Date().toISOString(),
    });
  }
}
