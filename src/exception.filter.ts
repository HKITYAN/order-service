import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from '@/validationException';

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
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = "INTERNAL_SERVER_ERROR"
    }

    if (info == null) {
      response.status(status).json({ error: errorMessage });
    } else {
      response.status(status).json({ error: errorMessage, info })
    }
  }
}
