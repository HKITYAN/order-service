import { ValidationError } from 'class-validator';

export const validationErrorFlatMap = (errorList: ValidationError[]) => {
    const validationErrorMsg : object[] = []
    errorList.forEach(error => {
        flattenError(error, error.property, validationErrorMsg);
    });
    return validationErrorMsg;
}

const flattenError = (error: ValidationError, field: string, validationErrorMsgList: object[]): void => {
    if (error.children.length == 0) {
      validationErrorMsgList.push({
        field,
        violations: error.constraints,
      });
      return;
    }
    const childError = error.children;
    for (const error of childError) {
      field = `${field}.${error.property}`;
      return this.flattenError(error, field, validationErrorMsgList);
    }
}