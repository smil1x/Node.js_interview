import { Injectable } from '@nestjs/common';
import { Lambda } from '@app/blueprints/applications';
import { InitParams } from '@app/blueprints/interfaces';
import { INestApplicationContext } from '@nestjs/common/interfaces/nest-application-context.interface';

let applicationContext: INestApplicationContext;

@Injectable()
export class BlueprintsFactory {
  static async createLambda<T>(params: InitParams<T>): Promise<INestApplicationContext> {
    if (applicationContext) {
      return applicationContext;
    }
    applicationContext = await new Lambda().init<T>(params);
    return applicationContext;
  }
}
