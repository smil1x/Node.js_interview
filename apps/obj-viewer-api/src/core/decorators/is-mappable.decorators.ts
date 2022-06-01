import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsMappable(property: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCanBeMapped',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          let isMappable = true;
          value.data &&
            Object.keys(value.data).forEach((key) => {
              const type = value.data[key].type;
              if (type && type.toLowerCase() === 'mapping' && !relatedValue.includes(value.data[key].value)) {
                isMappable = false;
              }
            });
          value.params &&
            Object.keys(value.params).forEach((key) => {
              const type = value.params[key].type;
              if (type && type.toLowerCase() === 'mapping' && !relatedValue.includes(value.params[key].value)) {
                isMappable = false;
              }
            });
          return isMappable;
        },
      },
    });
  };
}
