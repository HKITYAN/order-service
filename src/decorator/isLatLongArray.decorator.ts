import { isLatitude, isLongitude, registerDecorator, ValidatorConstraintInterface, ValidationOptions, ValidationArguments, ValidatorConstraint} from "class-validator"

@ValidatorConstraint()
export class LatLongConstraint implements ValidatorConstraintInterface {
    validate(latLongArray: string[], args: ValidationArguments): boolean {
        if (latLongArray?.length !== 2) return false
        const isLat = isLatitude(latLongArray[0]);
        const isLong = isLongitude(latLongArray[1]);
        return isLat && isLong;
    }
    
    defaultMessage(args: ValidationArguments): string {
    return `Coordiante format incorrect`;
    }
}
export function IsLatLongArray(validationOptions?: ValidationOptions) {
    return function(object: Record<string, any>, propertyName: string): void {
        registerDecorator({
          name: "coordinateFormat",
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: LatLongConstraint,
        });
      };
}

