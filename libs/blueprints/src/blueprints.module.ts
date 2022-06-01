import { Module } from '@nestjs/common';
import { BlueprintsFactory } from './blueprints.factory';

@Module({
  providers: [BlueprintsFactory],
  exports: [BlueprintsFactory],
})
export class BlueprintsModule {}
