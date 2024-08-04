import { FarmArea } from "@domain/entities/FarmArea";

describe('FarmArea', () => {
  describe('create', () => {
    it('should create a valid FarmArea object', () => {
      const farmArea = new FarmArea(100, 60, 40);
      expect(farmArea.getTotalArea()).toBe(100);
      expect(farmArea.getCultivableArea()).toBe(60);
      expect(farmArea.getVegetationArea()).toBe(40);
    });

    it('should throw an error if total area is zero or negative', () => {
      expect(() => new FarmArea(0, 0, 0)).toThrow('Total area must be greater than zero');
      expect(() => new FarmArea(-10, 0, 0)).toThrow('Total area must be greater than zero');
    });

    it('should throw an error if cultivable area is negative', () => {
      expect(() => new FarmArea(100, -10, 50)).toThrow('Cultivable area cannot be negative');
    });

    it('should throw an error if vegetation area is negative', () => {
      expect(() => new FarmArea(100, 50, -10)).toThrow('Vegetation area cannot be negative');
    });

    it('should throw an error if sum of cultivable and vegetation areas exceeds total area', () => {
      expect(() => new FarmArea(100, 60, 50)).toThrow('Sum of cultivable and vegetation areas cannot exceed total area');
    });
  });

  describe('getters', () => {
    it('should return correct values', () => {
      const farmArea = new FarmArea(100, 60, 40);
      expect(farmArea.getTotalArea()).toBe(100);
      expect(farmArea.getCultivableArea()).toBe(60);
      expect(farmArea.getVegetationArea()).toBe(40);
    });
  });

  describe('equals', () => {
    it('should return true for equal FarmArea objects', () => {
      const farmArea1 = new FarmArea(100, 60, 40);
      const farmArea2 = new FarmArea(100, 60, 40);
      expect(farmArea1.equals(farmArea2)).toBe(true);
    });

    it('should return false for different FarmArea objects', () => {
      const farmArea1 = new FarmArea(100, 60, 40);
      const farmArea2 = new FarmArea(200, 120, 80);
      expect(farmArea1.equals(farmArea2)).toBe(false);
    });
  });
});