import { Farm } from "@domain/entities/Farm";

export const FARM_GATEWAY_INTERFACE = 'FarmGatewayInterface';

export interface FarmGateway {
  getById(id: string): Promise<Farm | null>;
  save(Farm: Farm): Promise<void>;
  find(params: any): Promise<Farm | null>;
  update(Farm: Farm): Promise<void>;
  delete(id: string): Promise<void>;
}
