import { Farmer } from '@domain/entities/Farmer';
import { FarmerGateway } from '@domain/gateway/farmer.gateway';

export class FarmerDatabaseGateway implements FarmerGateway {
  getById(id: string): Promise<Farmer | null> {
    throw new Error('Method not implemented.');
  }
  save(farmer: Farmer): Promise<void> {
    throw new Error('Method not implemented.');
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
