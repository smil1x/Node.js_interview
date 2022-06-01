import { Module } from '@nestjs/common';
import { ObjectModule } from './object/object.module';
import { HealthModule } from '@app/health';
import { APP_DESCRIPTION } from './core/constants';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ObjectModule, HealthModule.register(APP_DESCRIPTION, () => new PrismaService().$executeRaw('select 1') )],
})
export class AppModule {}
