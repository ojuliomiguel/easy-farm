import { GUID } from '@domain/commom/domain.types';
import { FarmArea } from './FarmArea';
import { Address } from './Adress';
import { Crop } from './Crop';

export class Farm {
  private constructor(
    private readonly id: GUID | null,
    private readonly name: string,
    private readonly area: FarmArea,
    private readonly address: any,
    private readonly crops: any[],
  ) { }

  static create(
    name: string,
    area: FarmArea,
    address: Address,
    crops: Crop[],
  ): Farm {
    return new Farm(null, name, area, address, crops);
  }

  static restore(
    id: GUID,
    name: string,
    address: Address,
    area: FarmArea,
    crops: Crop[],
  ): Farm {
    return new Farm(id, name, area, address, crops);
  }

  getId(): GUID | null {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAddress(): Address {
    return this.address;
  }

  getArea(): FarmArea {
    return this.area;
  }

  getCrops(): Crop[] {
    return this.crops;
  }
}
