import { isLatitude, isLongitude, registerDecorator, ValidatorConstraintInterface, ValidationOptions, ValidationArguments, ValidatorConstraint} from "class-validator"

@ValidatorConstraint()
export class LatLongConstraint implements ValidatorConstraintInterface {
    validate(latLongArray: string[], args: ValidationArguments): boolean {
        const isLat = isLatitude(latLongArray[0]);
        const isLong = isLongitude(latLongArray[1]);
        return isLat && isLong;
    }
    
    defaultMessage(args: ValidationArguments): string {
    return `${args.property} field coordiante format is not in correct format`;
    }
}
export function IsLatLongArray(validationOptions?: ValidationOptions) {
    return function(object: Record<string, any>, propertyName: string): void {
        registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: LatLongConstraint,
        });
      };
}

