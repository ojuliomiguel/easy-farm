import { Farmer } from "@domain/entities/Farmer";
import { FarmerGateway } from "@domain/gateway/farmer.gateway";
import { FarmInput, RegisterFarmerUseCaseInput } from "./register-farmer.usecase.types";
import { Farm } from "@domain/entities/Farm";
import { FarmArea } from "@domain/entities/FarmArea";
import { Address } from "@domain/entities/Adress";
import { Crop } from "@domain/entities/Crop";
import { FarmerAlreadyExists, MissingCpfOrCnpjException } from "src/application/erros/easy-farm-context.exceptions";

export class RegisterFarmerUseCase {
  constructor(private readonly farmerGateway: FarmerGateway) { }

  async execute(input: RegisterFarmerUseCaseInput): Promise<void> {
    if (!input.cpf && !input.cnpj) {
      throw new MissingCpfOrCnpjException('A farmer must have either a CPF or a CNPJ');
    }
    const farmerExists = await this.farmerGateway.find({
      where: input.cpf ? { cpf: input.cpf } : { cnpj: input.cnpj }
    });
    
    if (farmerExists) {
      throw new FarmerAlreadyExists('Farmer already exists');
    }
    const farms = input.farms.map((farmInput: FarmInput) => {
      const farmArea = new FarmArea(
        farmInput.farmArea.totalArea,
        farmInput.farmArea.cultivableArea,
        farmInput.farmArea.vegetationArea
      )
      const adress = Address.create(
        farmInput.address.name,
        farmInput.address.state
      )
      const crops = farmInput.cultivationAreas.map((cropInput: any) => {
        return Crop.create(cropInput.name)
      })
      return Farm.create(
        farmInput.name,
        farmArea,
        adress,
        crops,
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
