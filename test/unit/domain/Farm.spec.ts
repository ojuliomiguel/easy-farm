import { GUID } from '@domain/commom/domain.types';
import { Farm } from '@domain/entities/Farm';
import { FarmArea } from '@domain/entities/FarmArea';

describe('Farm', () => {
  let farmArea: FarmArea;
  let crops: any[];

  beforeEach(() => {
    farmArea = new FarmArea(100, 60, 40);
    crops = [{ name: 'Wheat' }, { name: 'Corn' }];
  });

  it('should create a farm using the create method', () => {
    const farm = Farm.create('My Farm', { addressLine: '123 Farm Lane' }, farmArea, crops);

    expect(farm.getId()).toBeNull();
    expect(farm.getName()).toBe('My Farm');
    expect(farm.getAddress()).toEqual({ addressLine: '123 Farm Lane' });
    expect(farm.getArea()).toBe(farmArea);
    expect(farm.getCrops()).toBe(crops);
  });

  it('should restore a farm using the restore method', () => {
    const id: GUID = '12345-abcde-67890';
    const farm = Farm.restore(id, 'My Farm', { addressLine: '123 Farm Lane' }, farmArea, crops);

    expect(farm.getId()).toBe(id);
    expect(farm.getName()).toBe('My Farm');
    expect(farm.getAddress()).toEqual({ addressLine: '123 Farm Lane' });
    expect(farm.getArea()).toBe(farmArea);
    expect(farm.getCrops()).toBe(crops);
  });

  it('should throw an error when creating a farm with an invalid FarmArea', () => {
    expect(() => {
      const farmArea = new FarmArea(0, 60, 40); 
      Farm.create('My Farm', { addressLine: '123 Farm Lane' }, farmArea, crops);
    }).toThrow('Total area must be greater than zero');
  });

  it('should throw an error when creating a farm exceeding the total FarmArea', () => {
    expect(() => {
      const farmArea = new FarmArea(100, 200, 40); 
      Farm.create('My Farm', { addressLine: '123 Farm Lane' }, farmArea, crops);
    }).toThrow('Sum of cultivable and vegetation areas cannot exceed total area');
  });
});
