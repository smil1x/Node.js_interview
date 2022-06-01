import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_VALIDATION_OPTIONS } from '@app/common';

export const defaultValidationPipe = new ValidationPipe({
  ...DEFAULT_VALIDATION_OPTIONS,
  transformOptions: {
    enableImplicitConversion: true,
  },
});
