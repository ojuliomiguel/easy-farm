export interface RegisterFarmerUseCaseInput {
  name: string;
  cpf: string | null;
  cnpj: string | null;
  farms: FarmInput[];
}

export interface FarmInput {
  name: string;
  farmArea: FarmAreaInput;
  cultivationArea: CultivationAreaInput;
}

export interface FarmAreaInput {
  totalArea: number;
  cultivableArea: number;
  vegetationArea: number;
}

export interface CultivationAreaInput {
  name: string;
}
