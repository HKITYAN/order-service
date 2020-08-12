import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { validationErrorFlatMap } from 'utils/utils';

export class ValidationException {
  constructor(validationErrors: ValidationError[]) {
    this.message = 'VALIDATION_ERROR';
    this.errMsgList = validationErrorFlatMap(validationErrors)
  }

  readonly message: string;
  readonly errMsgList: object[]
}
