import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from 'ValidationException';

@Catch()
export class GloablExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GloablExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let errorMessage : string = ""
    let status = null;
    let info = null;

    if (exception instanceof HttpException) {
        status = exception.getStatus();
        errorMessage = exception.getResponse().toString();
    } else if (exception instanceof ValidationException) {
        status = HttpStatus.BAD_REQUEST;
        errorMessage = exception.message;
        info = exception.errMsgList

    }
    this.logger.error(exception.message, exception?.stack);

    response.status(status).json({ error: errorMessage, info });
  }
}
