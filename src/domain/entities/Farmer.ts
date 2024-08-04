type GUID = string;

export class Farmer {
  private readonly id: GUID | null;
  private readonly cpf: string | null;
  private readonly cnpj: string | null;
  private readonly name: string;
  private readonly farms: any[];

  private constructor(
    id: GUID | null,
    name: string,
    cpf: string | null,
    cnpj: string | null,
    farms: any[],
  ) {
    if (!cpf && !cnpj) {
      throw new Error('A farmer must have either a CPF or a CNPJ');
    }
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.cnpj = cnpj;
    this.farms = farms;
  }

  public static create(
    name: string,
    cpf: string | null,
    cnpj: string | null,
    farms: any[],
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
