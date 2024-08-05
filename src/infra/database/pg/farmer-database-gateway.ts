import { FarmerGateway } from '@domain/gateway/farmer.gateway';
import { Injectable } from '@nestjs/common';
import { Farm } from './typeorm/entities/farm.entity';
import { FarmerTypeOrmEntity } from './typeorm/entities/farmer.entity';
import { DataSource } from 'typeorm';
import { Farmer } from '@domain/entities/Farmer';
import { FarmArea } from './typeorm/entities/farm-area.entity';
import { CultivationArea } from './typeorm/entities/cultivation-area.entity';


@Injectable()
export class FarmerDatabaseGateway implements FarmerGateway {

  constructor(
    private readonly dataSource: DataSource
  ) {
    console.log("DataSource initialized: ", this.dataSource.isInitialized);
  }
  find(params: any): Promise<Farmer | null> {
    return null;
  }

  async getById(id: string): Promise<any> {
    return await this.dataSource
      .getRepository(FarmerTypeOrmEntity)
      .findOne({ where: { id } });
  }
  async save(farmer: Farmer): Promise<void> {
    const farmerTypeOrmEntity = new FarmerTypeOrmEntity();
    farmerTypeOrmEntity.name = farmer.getName();
    farmerTypeOrmEntity.cpf = farmer.getCPF();
    farmerTypeOrmEntity.cnpj = farmer.getCNPJ();
    const farmsTypeOrmEntity = farmer.getFarms().map(f => {
      const farmTypeOrmEntity = new Farm();
      farmTypeOrmEntity.name = f.getName();
      farmTypeOrmEntity.farmArea = new FarmArea()
      farmTypeOrmEntity.farmArea.totalArea = f.getArea().getTotalArea();
      farmTypeOrmEntity.farmArea.cultivableArea = f.getArea().getCultivableArea();
      farmTypeOrmEntity.farmArea.vegetationArea = f.getArea().getVegetationArea();
      return farmTypeOrmEntity;
    });
    farmerTypeOrmEntity.farms = farmsTypeOrmEntity;
    const farmerRepository = this.dataSource.getRepository(FarmerTypeOrmEntity);
    try {
      const savedFarmer = await farmerRepository.save(farmerTypeOrmEntity);
      console.log('Farmer with relations saved successfully:', savedFarmer);
    } catch (error) {
      console.error('Error saving farmer with relations:', error);
    }
  }

  update(farmer: Farmer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Farmer[]> {
    throw new Error('Method not implemented.');
  }
}
