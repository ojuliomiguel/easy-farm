import { FARMER_GATEWAY_INTERFACE } from '@domain/gateway/farmer.gateway';
import { Module } from '@nestjs/common';
import { FarmerDatabaseGateway } from './farmer-database-gateway';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { FarmerTypeOrmEntity as Farmer } from './typeorm/entities/farmer.entity';
import { Repository } from 'typeorm';
import { TypeOrmRepositoryAdapter } from 'src/infra/adapters/database/type-orm-repository-adapter';
import { Farm } from './typeorm/entities/farm.entity';
import { FarmArea } from './typeorm/entities/farm-area.entity';
import { CultivationArea } from './typeorm/entities/cultivation-area.entity';

const FarmerGatewayProvider = {
  provide: FARMER_GATEWAY_INTERFACE,
  useClass: FarmerDatabaseGateway,
};

@Module({
  imports: [TypeOrmModule.forFeature([Farmer, Farm, FarmArea, CultivationArea])],
  providers: [
    FarmerGatewayProvider
  ],
  exports: [FarmerGatewayProvider],
})
export class PgModule { }
