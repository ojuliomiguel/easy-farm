export class FarmerFixture {
  static getFarmerFixture(values?: any) {
    const defaultFarmer = {
      name: 'Jhon LobsterBurn',
      cpf: '123.456.789-00',
      cnpj: '12.345.678/0001-90',
      farms: [{ name: 'Farm 1' }, { name: 'Farm 2' }],
    };
    return {
      ...defaultFarmer,
      ...values,
    };
  }
}
