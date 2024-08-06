import { FarmerGateway } from '@domain/gateway/farmer.gateway';
import { Injectable } from '@nestjs/common';
import { Farm } from './typeorm/entities/farm.entity';
import { FarmerTypeOrmEntity } from './typeorm/entities/farmer.entity';
import { DataSource } from 'typeorm';
import { Farmer } from '@domain/entities/Farmer';
import { FarmArea } from './typeorm/entities/farm-area.entity';
import { CultivationArea } from './typeorm/entities/cultivation-area.entity';
import { FarmAddress } from './typeorm/entities/farm-adress.entity';


@Injectable()
export class FarmerDatabaseGateway implements FarmerGateway {

  private farmerRepository: any

  constructor(
    private readonly dataSource: DataSource
  ) {
    console.log("DataSource initialized: ", this.dataSource.isInitialized);
    this.farmerRepository = this.dataSource.getRepository(FarmerTypeOrmEntity);
  }
  async find(params: any): Promise<Farmer[] | null> {
    return await this.farmerRepository.find({
      where: params,
      relations: ['farms', 'farms.address', 'farms.farmArea', 'farms.cultivationAreas'],
    });
  }

  async getById(id: string): Promise<any> {
    return await this.farmerRepository
      .findOne({
        where: { id },
        relations: ['farms', 'farms.address', 'farms.farmArea', 'farms.cultivationAreas'],
      });
  }

  async save(farmer: Farmer): Promise<void> {
    const farmerTypeOrmEntity = new FarmerTypeOrmEntity();
    farmerTypeOrmEntity.name = farmer.getName();
    farmerTypeOrmEntity.cpf = farmer.getCPF();
    farmerTypeOrmEntity.cnpj = farmer.getCNPJ();
    const farmsTypeOrmEntity = farmer.getFarms().map(f => {
      const farmTypeOrmEntity = new Farm();
      farmTypeOrmEntity.name = f.getName();
      farmTypeOrmEntity.address = new FarmAddress();
      farmTypeOrmEntity.address.name = f.getAddress().getName();
      farmTypeOrmEntity.address.state = f.getAddress().getState();
      farmTypeOrmEntity.farmArea = new FarmArea()
      farmTypeOrmEntity.farmArea.totalArea = f.getArea().getTotalArea();
      farmTypeOrmEntity.farmArea.cultivableArea = f.getArea().getCultivableArea();
      farmTypeOrmEntity.farmArea.vegetationArea = f.getArea().getVegetationArea();
      farmTypeOrmEntity.cultivationAreas = f.getCrops().map(
        c => {
          const cultivationAreaTypeOrmEntity = new CultivationArea();
          cultivationAreaTypeOrmEntity.name = c.getName();
          return cultivationAreaTypeOrmEntity;
        }
      )
      return farmTypeOrmEntity;
    });
    farmerTypeOrmEntity.farms = farmsTypeOrmEntity;
    try {
      const savedFarmer = await this.farmerRepository.save(farmerTypeOrmEntity);
      console.log('Farmer with relations saved successfully:', savedFarmer);
    } catch (error) {
      console.error('Error saving farmer with relations:', error);
    }
  }

  update(farmer: Farmer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<void> {
    await this.farmerRepository.delete(id);
  }
  getAll(): Promise<Farmer[]> {
    throw new Error('Method not implemented.');
  }

}
