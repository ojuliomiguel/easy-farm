import { FarmerGateway } from "@domain/gateway/farmer.gateway";

export class DeleteFarmerUseCase {

  constructor(private readonly farmerGateway: FarmerGateway) { }

  async execute(id: string): Promise<void> {
    await this.farmerGateway.delete(id);
  }
}
