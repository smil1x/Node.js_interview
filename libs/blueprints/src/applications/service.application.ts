import { ApplicationInterface } from '@app/blueprints/interfaces';

export class Service implements ApplicationInterface {
  async init(): Promise<any> {
    // TODO add service initialization
    console.log('SERVICE is created');
  }
}
