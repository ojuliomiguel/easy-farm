import {
  FARMER_GATEWAY_INTERFACE,
  FarmerGateway,
} from '@domain/gateway/farmer.gateway';
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { RegisterFarmerUseCase } from 'src/application/usecases/farmer/register-farmer.usecase';
import { CreateFarmerDTO } from '../easy-farm-context.dtos';
import { ListFarmerUseCase } from '@application/usecases/farmer/list-farmer.usecase';
import { DeleteFarmerUseCase } from '@application/usecases/farmer/delete-farmer.usecase';
import { FarmerAlreadyExists, MissingCpfOrCnpjException } from 'src/application/erros/easy-farm-context.exceptions';

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

  @Get()
  async list(
  ) {
    const useCase = new ListFarmerUseCase(this.farmerGateway);
    return await useCase.list({});
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() request: CreateFarmerDTO) {
    try {
      const useCase = new RegisterFarmerUseCase(this.farmerGateway);
      await useCase.execute(request);
    } catch (error) {
      if (
        error instanceof MissingCpfOrCnpjException ||
        error instanceof FarmerAlreadyExists
      ) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const useCase = new DeleteFarmerUseCase(this.farmerGateway);
    await useCase.execute(id);
  }
}
