import { Module } from '@nestjs/common';
import { FarmerHttpApi } from './farmer/farmer.http';
import { PgModule } from '../database/pg/pg.module';
import { HealthHttpApi } from './health.http';

@Module({
  imports: [PgModule],
  controllers: [FarmerHttpApi, HealthHttpApi],
})
export class HttpModule { }
