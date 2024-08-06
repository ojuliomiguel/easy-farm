export class MissingCpfOrCnpjException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingCpfOrCnpjException';
  }
}

export class FarmerAlreadyExists extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FarmerAlreadyExists';
  }
}