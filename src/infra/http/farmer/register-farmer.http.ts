import {
  FARMER_GATEWAY_INTERFACE,
  FarmerGateway,
} from '@domain/gateway/farmer.gateway';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller()
export class FarmerHttpApi {
  constructor(
    @Inject(FARMER_GATEWAY_INTERFACE)
    private readonly farmerGateway: FarmerGateway,
  ) {}

  @Get()
  getHello(): string {
    return;
  }
}
