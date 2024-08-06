export interface RegisterFarmerUseCaseInput {
  name: string;
  cpf: string | null;
  cnpj: string | null;
  farms: FarmInput[];
}

export interface FarmInput {
  name: string;
  address: AddressInput;
  farmArea: FarmAreaInput;
  cultivationAreas: CultivationAreaInput[];
}

export interface FarmAreaInput {
  totalArea: number;
  cultivableArea: number;
  vegetationArea: number;
}

export interface CultivationAreaInput {
  name: string;
}

export interface AddressInput {
  name: string;
  state: string;
}
