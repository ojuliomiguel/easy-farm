import {
  FARMER_GATEWAY_INTERFACE,
  FarmerGateway,
} from '@domain/gateway/farmer.gateway';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { RegisterFarmerUseCase } from 'src/application/usecases/farmer/register-farmer.usecase';
import { CreateFarmerDTO } from '../farm-context.dtos';
import { ListFarmerUseCase } from '@application/usecases/farmer/list-farmer.usecase';
import { DeleteFarmerUseCase } from '@application/usecases/farmer/delete-farmer.usecase';

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
  async getById(
    @Param('id') id: string,
  ) {
    const useCase = new ListFarmerUseCase(this.farmerGateway);
    return await useCase.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  save(@Body() request: CreateFarmerDTO) {
    const useCase = new RegisterFarmerUseCase(this.farmerGateway);
    useCase.execute(request);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const useCase = new DeleteFarmerUseCase(this.farmerGateway);
    await useCase.execute(id);
  }
}
