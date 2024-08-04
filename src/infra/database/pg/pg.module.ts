import { FARMER_GATEWAY_INTERFACE } from '@domain/gateway/farmer.gateway';
import { Module } from '@nestjs/common';
import { FarmerDatabaseGateway } from './farmer-database-gateway';

const FarmerGatewayProvider = {
  provide: FARMER_GATEWAY_INTERFACE,
  useClass: FarmerDatabaseGateway,
};

@Module({
  providers: [FarmerGatewayProvider],
  exports: [FarmerGatewayProvider],
})
export class PgModule {}
