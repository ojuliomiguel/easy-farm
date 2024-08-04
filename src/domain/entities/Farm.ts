import { GUID } from '@domain/commom/domain.types';
import { FarmArea } from './FarmArea';

export class Farm {
  private constructor(
    private readonly id: GUID | null,
    private readonly name: string,
    private readonly address: any,
    private readonly area: FarmArea,
    private readonly crops: any[],
  ) {}

  static create(
    name: string,
    address: any,
    area: FarmArea,
    crops: any[],
  ): Farm {
    return new Farm(null, name, address, area, crops);
  }

  static restore(
    id: GUID,
    name: string,
    address: any,
    area: FarmArea,
    crops: any[],
  ): Farm {
    return new Farm(id, name, address, area, crops);
  }

  getId(): GUID | null {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAddress(): any {
    return this.address;
  }

  getArea(): FarmArea {
    return this.area;
  }

  getCrops(): any[] {
    return this.crops;
  }
}
