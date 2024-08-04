import { Farmer } from '@domain/entities/Farmer';
import { FarmerGateway } from '@domain/gateway/farmer.gateway';
import { Inject, Injectable } from '@nestjs/common';
import { OrmRepositoryAdapter } from 'src/infra/adapters/database/orm-repository-adapter';

@Injectable()
export class FarmerDatabaseGateway implements FarmerGateway {

  constructor(
    @Inject('FARMER_REPOSITORY')
    private readonly ormRepositoryAdapter: OrmRepositoryAdapter<any>
  ) { }
  find(params: any): Promise<Farmer | null> {
    return this.ormRepositoryAdapter.find(params);
  }

  getById(id: string): Promise<any> {
    return this.ormRepositoryAdapter.getById(id);
  }
  async save(farmer: Farmer): Promise<void> {
    const dataToSave = {
      name: farmer.getName(),
      cpf: farmer.getCPF(),
      cnpj: farmer.getCNPJ(),
      farms: farmer.getFarms().map(f => {
        return {
          name: f.getName(),
          farmArea: {
            totalArea: f.getArea().getTotalArea(),
            cultivableArea: f.getArea().getCultivableArea(),
            vegetationArea: f.getArea().getVegetationArea(),
          },
          cultivationArea: {
            name: f.getCultivationArea().getName(),
          },
        };
      }),
    }
    await this.ormRepositoryAdapter.save(dataToSave);
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
