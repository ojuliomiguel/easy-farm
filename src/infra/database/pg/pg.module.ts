import { FARMER_GATEWAY_INTERFACE } from '@domain/gateway/farmer.gateway';
import { Module } from '@nestjs/common';
import { FarmerDatabaseGateway } from './farmer-database-gateway';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from './typeorm/entities/farmer.entity';
import { Repository } from 'typeorm';
import { TypeOrmRepositoryAdapter } from 'src/infra/adapters/database/type-orm-repository-adapter';

const FarmerGatewayProvider = {
  provide: FARMER_GATEWAY_INTERFACE,
  useClass: FarmerDatabaseGateway,
};

@Module({
  imports: [TypeOrmModule.forFeature([Farmer])],
  providers: [
    {
      provide: 'FARMER_REPOSITORY',
      useFactory: (photoRepository: Repository<Farmer>) => new TypeOrmRepositoryAdapter(photoRepository),
      inject: [getRepositoryToken(Farmer)]
    },
    FarmerGatewayProvider
  ],
  exports: [FarmerGatewayProvider],
})
export class PgModule { }
