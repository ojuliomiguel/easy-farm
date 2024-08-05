import { Farmer } from "@domain/entities/Farmer";
import { FarmerGateway } from "@domain/gateway/farmer.gateway";
import { RegisterFarmerUseCaseInput } from "./register-farmer.usecase.types";
import { Farm } from "@domain/entities/Farm";
import { FarmArea } from "@domain/entities/FarmArea";

export class RegisterFarmerUseCase {
  constructor(private readonly farmerGateway: FarmerGateway) { }

  async execute(input: RegisterFarmerUseCaseInput): Promise<void> {
    if (!input.cpf && !input.cnpj) {
      throw new Error('A farmer must have either a CPF or a CNPJ');
    }

    const farmerExists = await this.farmerGateway.find({
      where: {
        cpf: input.cpf
      }
    })

    if (farmerExists) {
      throw new Error('Farmer already exists');
    }

    const farms = input.farms.map((farmInput: any) => {
      const farmArea =  new FarmArea(
        farmInput.farmArea.totalArea,
        farmInput.farmArea.cultivableArea,
        farmInput.farmArea.vegetationArea
      )
      return Farm.create(
        farmInput.name,
        farmArea,
        null,
        null,
      );
    });

    const farmer = Farmer.create(
      input.name,
      input.cpf,
      input.cnpj,
      farms
    );
    
    await this.farmerGateway.save(farmer);
  }
}
