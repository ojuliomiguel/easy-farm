import { Farmer } from '@domain/entities/Farmer';

export const FARMER_GATEWAY_INTERFACE = 'FarmerGatewayInterface';

export interface FarmerGateway {
  getById(id: string): Promise<Farmer | null>;
  save(farmer: Farmer): Promise<void>;
  find(params: any): Promise<Farmer | Farmer[] | null>;
  update(farmer: Farmer): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Farmer[]>;
}
