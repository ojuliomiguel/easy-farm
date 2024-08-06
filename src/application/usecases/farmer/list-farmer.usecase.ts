import { Farmer } from "@domain/entities/Farmer";
import { FarmerGateway } from "@domain/gateway/farmer.gateway";

export class ListFarmerUseCase {

  constructor(private readonly farmerGateway: FarmerGateway) { }

  async getById(id: string): Promise<Farmer> {
    return await this.farmerGateway.getById(id);
  }

  async list(input: any): Promise<Farmer | Farmer[]> {
    return await this.farmerGateway.find({});
  }
}