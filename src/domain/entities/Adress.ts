import { GUID } from '@domain/commom/domain.types';

export class Address {
  private constructor(
    private readonly id: GUID | null,
    private readonly name: string,
    private readonly state: string,
  ) {}

  static create(
    name: string,
    state: string,
  ): Address {
    return new Address(null, name, state);
  }

  static restore(
    id: GUID,
    name: string,
    state: string,
  ): Address {
    return new Address(id, name, state);
  }

  getId(): GUID | null {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getState(): string {
    return this.state;
  }
}
