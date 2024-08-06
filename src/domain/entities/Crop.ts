import { GUID } from '@domain/commom/domain.types';

export class Crop {
  private constructor(
    private readonly id: GUID | null,
    private readonly name: string,
  ) { }

  static create(
    name: string,
  ): Crop {
    return new Crop(null, name);
  }

  static restore(
    id: GUID,
    name: string,
  ): Crop {
    return new Crop(id, name);
  }

  getId(): GUID | null {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}
