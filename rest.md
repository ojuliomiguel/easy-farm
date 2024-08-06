## Endpoints

Com o base url fornecido você poderá acessar os seguintes endpoints:

### 1. Listar Agricultores

- **Método**: `GET`
- **Endpoint**: `/farmers`
- **Descrição**: Lista todos os agricultores cadastrados.
- **Respostas**:
  - **200 OK**: Retorna a lista de agricultores.
  - **500 Internal Server Error**: Ocorreu um erro ao processar a solicitação.

### 2. Obter Agricultor por ID

- **Método**: `GET`
- **Endpoint**: `/farmers/:id`
- **Descrição**: Obtém os detalhes de um agricultor específico pelo seu ID.
- **Parâmetros**:
  - `id` (string): Identificador do agricultor.
- **Respostas**:
  - **200 OK**: Retorna os detalhes do agricultor.
  - **500 Internal Server Error**: Ocorreu um erro ao processar a solicitação.


### 3. Criar Agricultor

- **Método**: `POST`
- **Endpoint**: `/farmers`
- **Descrição**: Registra um novo agricultor.
- **Corpo da Requisição**: `CreateFarmerDTO`
  - `name` (string): Nome do agricultor.
  - `cpf` (string | null): CPF do agricultor (opcional).
  - `cnpj` (string | null): CNPJ do agricultor (opcional).
  - `farms` (FarmDTO[]): Lista de fazendas associadas ao agricultor (opcional).
- **Respostas**:
  - **201 Created**: Agricultor criado com sucesso.
  - **400 Bad Request**: Erro de validação (e.g., CPF ou CNPJ ausente, agricultor já existe).
  - **500 Internal Server Error**: Ocorreu um erro ao processar a solicitação.

### 4. Deletar Agricultor

- **Método**: `DELETE`
- **Endpoint**: `/farmers/:id`
- **Descrição**: Remove um agricultor específico pelo seu ID.
- **Parâmetros**:
  - `id` (string): Identificador do agricultor.
- **Respostas**:
  - **204 No Content**: Agricultor removido com sucesso.
  - **500 Internal Server Error**: Ocorreu um erro ao processar a solicitação.

## DTOs

### CreateFarmerDTO

- `name` (string): **Obrigatório**. Nome do agricultor.
- `cpf` (string | null): Opcional. CPF do agricultor.
- `cnpj` (string | null): Opcional. CNPJ do agricultor.
- `farms` (FarmDTO[]): Opcional. Lista de fazendas associadas ao agricultor.

### FarmDTO

- `name` (string): **Obrigatório**. Nome da fazenda.
- `address` (AddressDTO): **Obrigatório**. Endereço da fazenda.
  - `name` (string): **Obrigatório**. Nome do endereço.
  - `state` (string): **Obrigatório**. Estado do endereço.
- `farmArea` (FarmAreaDTO): **Obrigatório**. Área da fazenda.
  - `totalArea` (number): **Obrigatório**. Área total da fazenda.
  - `cultivableArea` (number): **Obrigatório**. Área cultivável da fazenda.
  - `vegetationArea` (number): **Obrigatório**. Área de vegetação da fazenda.
- `cultivationAreas` (CultivationAreaDto[]): **Obrigatório**. Áreas de cultivo da fazenda.
  - `name` (string): **Obrigatório**. Nome da área de cultivo.

## Exceções

### FarmerAlreadyExists

Exceção lançada quando um agricultor com o mesmo CPF ou CNPJ já existe.

### MissingCpfOrCnpjException

Exceção lançada quando CPF ou CNPJ está ausente na requisição de criação do agricultor.

### FarmAreaException

Exceção lançada quando fornecido uma área de cultivo inválida.
