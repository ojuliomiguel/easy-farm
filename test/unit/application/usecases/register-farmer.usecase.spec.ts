import { FarmerGateway } from '@domain/gateway/farmer.gateway';
import { Farmer } from '@domain/entities/Farmer';
import { RegisterFarmerUseCase } from '@application/usecases/farmer/register-farmer.usecase';
import { RegisterFarmerUseCaseInput } from '@application/usecases/farmer/register-farmer.usecase.types';
import { FarmerFixture } from '@test/fixtures/Farmer.fixture';

describe('RegisterFarmerUseCase', () => {
  let registerFarmerUseCase: RegisterFarmerUseCase;
  let farmerGateway: jest.Mocked<FarmerGateway>;

  beforeEach(() => {
    farmerGateway = {
      find: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<FarmerGateway>;

    registerFarmerUseCase = new RegisterFarmerUseCase(farmerGateway);
  });

  it('should throw an error if neither CPF nor CNPJ is provided', async () => {
    const input: RegisterFarmerUseCaseInput = {
      name: 'John Doe',
      cpf: null,
      cnpj: null,
    };

    await expect(registerFarmerUseCase.execute(input)).rejects.toThrow('A farmer must have either a CPF or a CNPJ');
  });

  it('should throw an error if the farmer already exists', async () => {
    const input: RegisterFarmerUseCaseInput = {
      name: 'John Doe',
      cpf: '12345678901',
      cnpj: null,
    };

    farmerGateway.find.mockResolvedValueOnce(FarmerFixture.getFarmerFixture(input)); 
    await expect(registerFarmerUseCase.execute(input)).rejects.toThrow('Farmer already exists');
  });

  it('should save the farmer if it does not exist', async () => {
    const input: RegisterFarmerUseCaseInput = {
      name: 'John Doe',
      cpf: '12345678901',
      cnpj: null,
    };

    farmerGateway.find.mockResolvedValueOnce(null); 

    await registerFarmerUseCase.execute(input);

    expect(farmerGateway.find).toHaveBeenCalledWith({
      where: { cpf: input.cpf },
    });
    expect(farmerGateway.save).toHaveBeenCalledWith(expect.any(Farmer));
  });
});
