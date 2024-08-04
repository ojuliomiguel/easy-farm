import {
  FARMER_GATEWAY_INTERFACE,
  FarmerGateway,
} from '@domain/gateway/farmer.gateway';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { RegisterFarmerUseCase } from 'src/application/usecases/farmer/register-farmer.usecase';
import { CreateFarmerDTO } from '../farmer/farmer.dto';

@Controller({
  path: 'farmers',
  version: '1',
})
export class FarmerHttpApi {
  constructor(
    @Inject(FARMER_GATEWAY_INTERFACE)
    private readonly farmerGateway: FarmerGateway,
  ) { }

  @Get(':id')
  getById(
    @Param('id') id: string,
  ) {
    return this.farmerGateway.getById(id);
  }

  @Post(':id/farms')
  @HttpCode(HttpStatus.CREATED)
  save(@Body() request: CreateFarmerDTO) {
    const useCase = new RegisterFarmerUseCase(this.farmerGateway);
    useCase.execute(request);
  }
}
