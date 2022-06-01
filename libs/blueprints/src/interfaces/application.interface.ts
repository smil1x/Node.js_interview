import { INestApplicationContext } from '@nestjs/common/interfaces/nest-application-context.interface';

export interface ApplicationInterface {
  init: (...params) => Promise<INestApplicationContext>;
}
