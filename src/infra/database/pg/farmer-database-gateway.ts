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
    return this.ormRepositoryAdapter.getById('');
  }
  async save(farmer: Farmer): Promise<void> {
    await this.ormRepositoryAdapter.save({
      name: farmer.getName(),
      cpf: farmer.getCPF(),
      cnpj: farmer.getCNPJ(),
    });
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
