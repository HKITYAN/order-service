import { isLatitude, isLongitude, registerDecorator, ValidatorConstraintInterface, ValidationOptions, ValidationArguments, ValidatorConstraint} from "class-validator"

@ValidatorConstraint()
export class IsPositiveIntegerConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean {
        const isIntRegex = /^[0-9]+$/
        const isInt = isIntRegex.test(value);
        if (isInt && parseInt(value) > 0) {
            return true
        }
        return false
    }
    
    defaultMessage(args: ValidationArguments): string {
        return `String must be a postive integer`;
    }
}
export function IsPositiveInteger(validationOptions?: ValidationOptions) {
    return function(object: Record<string, any>, propertyName: string): void {
        registerDecorator({
            name: "isPositiveInteger",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPositiveIntegerConstraint,
        });
      };
}

