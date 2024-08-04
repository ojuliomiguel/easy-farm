import { GUID } from '@domain/commom/domain.types';
import { Farm } from './Farm';

export class Farmer {

  private constructor(
    private readonly id: GUID | null,
    private readonly name: string,
    private readonly cpf: string | null,
    private readonly cnpj: string | null,
    private readonly farms: Farm[] | null,
  ) {
    if (!cpf && !cnpj) {
      throw new Error('A farmer must have either a CPF or a CNPJ');
    }
  }

  public static create(
    name: string,
    cpf: string | null,
    cnpj: string | null,
    farms: Farm[] | null,
  ): Farmer {
    return new Farmer(null, name, cpf, cnpj, farms);
  }

  public static restore(
    id: GUID,
    name: string,
    cpf: string | null,
    cnpj: string | null,
    farms: any[],
  ): Farmer {
    return new Farmer(id, name, cpf, cnpj, farms);
  }

  getId(): GUID | null {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCPF(): any {
    return this.cpf;
  }

  getCNPJ(): any {
    return this.cnpj;
  }

  getFarms(): any[] {
    return this.farms;
  }
}
