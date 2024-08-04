import { Farmer } from '@domain/entities/Farmer';
import { FarmerFixture } from '@test/fixtures/Farmer.fixture';

describe('Farmer', () => {
  const farmerFixture = FarmerFixture.getFarmerFixture();

  describe('create', () => {
    it('should create a farmer with CPF', () => {
      const farmer = Farmer.create(
        farmerFixture.name,
        farmerFixture.cpf,
        null,
        farmerFixture.farms,
      );
      expect(farmer.getId()).toBeNull();
      expect(farmer.getName()).toBe(farmerFixture.name);
      expect(farmer.getCPF()).toBe(farmerFixture.cpf);
      expect(farmer.getCNPJ()).toBeNull();
      expect(farmer.getFarms()).toEqual(farmerFixture.farms);
    });

    it('should create a farmer with CNPJ', () => {
      const farmer = Farmer.create(
        farmerFixture.name,
        null,
        farmerFixture.cnpj,
        farmerFixture.farms,
      );
      expect(farmer.getId()).toBeNull();
      expect(farmer.getName()).toBe(farmerFixture.name);
      expect(farmer.getCPF()).toBeNull();
      expect(farmer.getCNPJ()).toBe(farmerFixture.cnpj);
      expect(farmer.getFarms()).toEqual(farmerFixture.farms);
    });

    it('should throw an error when creating a farmer without CPF or CNPJ', () => {
      expect(() =>
        Farmer.create(farmerFixture.name, null, null, farmerFixture.farms),
      ).toThrow('A farmer must have either a CPF or a CNPJ');
    });
  });
});
