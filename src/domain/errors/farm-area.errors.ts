export class FarmAreaException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FarmAreaException';
  }
}