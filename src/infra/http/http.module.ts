import { Module } from '@nestjs/common';
import { FarmerHttpApi } from './farmer/register-farmer.http';
import { PgModule } from '../database/pg/pg.module';

@Module({
  imports: [PgModule],
  controllers: [FarmerHttpApi],
})
export class HttpModule {}
