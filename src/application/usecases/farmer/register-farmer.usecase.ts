import { Farmer } from "@domain/entities/Farmer";
import { FarmerGateway } from "@domain/gateway/farmer.gateway";
import { RegisterFarmerUseCaseInput } from "./register-farmer.usecase.types";

export class RegisterFarmerUseCase {
  constructor(private readonly farmerGateway: FarmerGateway) { }

  async execute(input: RegisterFarmerUseCaseInput): Promise<void> {
    if (!input.cpf && !input.cnpj) {
      throw new Error('A farmer must have either a CPF or a CNPJ');
    }
    const farmer = Farmer.create(
      input.name,
      input.cpf,
      input.cnpj,
    );
    const farmerExists = await this.farmerGateway.find({
      where: {
        cpf: input.cpf
      }
    })

    if (farmerExists) {
      throw new Error('Farmer already exists');
    }
    await this.farmerGateway.save(farmer);
  }
}
