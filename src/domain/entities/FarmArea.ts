import { FarmAreaException } from "@domain/errors/farm-area.errors";

export class FarmArea {
  constructor(
    private readonly totalArea: number,
    private readonly cultivableArea: number,
    private readonly vegetationArea: number,
  ) {
    this.validateAreas(totalArea, cultivableArea, vegetationArea);
  }

  private validateAreas(
    totalArea: number,
    cultivableArea: number,
    vegetationArea: number,
  ): void {
    if (totalArea <= 0) {
      throw new FarmAreaException('Total area must be greater than zero');
    }
    if (cultivableArea < 0) {
      throw new FarmAreaException('Cultivable area cannot be negative');
    }
    if (vegetationArea < 0) {
      throw new FarmAreaException('Vegetation area cannot be negative');
    }
    if ((cultivableArea + vegetationArea) > totalArea) {
      throw new FarmAreaException(
        'Sum of cultivable and vegetation areas cannot exceed total area',
      );
    }
  }

  public getTotalArea(): number {
    return this.totalArea;
  }

  public getCultivableArea(): number {
    return this.cultivableArea;
  }

  public getVegetationArea(): number {
    return this.vegetationArea;
  }

  public equals(other: FarmArea): boolean {
    return this.totalArea === other.totalArea &&
      this.cultivableArea === other.cultivableArea &&
      this.vegetationArea === other.vegetationArea;
  }
}
