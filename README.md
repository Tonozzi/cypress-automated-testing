# cypress-automated-testing

Automated e2e tests in cypress for frontend and API of Serverest

# serverest-cypress

Este projeto reúne uma suíte de testes automatizados em Cypress para a plataforma ServeRest, contemplando testes E2E do frontend e testes de API. Foram implementados 3 cenários de teste para cada camada, e cada cenário cobre tanto o happy path quanto um fluxo negativo.

## Objeto de teste

### Frontend (`cypress/e2e/frontend`)

- **Login:** realiza o login com credenciais válidas e valida a exibição da mensagem de erro para credenciais inválidas.
- **Cadastro de usuário:** cadastra um novo usuário e valida a rejeição de um e-mail já existente.
- **Produtos:** pesquisa um produto, adiciona-o à lista de compras e valida o comportamento para um cenário negativo.

### API (`cypress/e2e/api`)

- **Usuários:** cria um novo usuário e valida a rejeição de um e-mail duplicado.
- **Login:** autentica um usuário com credenciais válidas e valida o retorno de erro para credenciais inválidas.
- **Produtos:** cria um novo produto utilizando um usuário administrador e valida a rejeição da requisição quando não há token de autenticação.

Cada spec representa um cenário principal. Em cada um deles, o happy path e o fluxo negativo são executados em conjunto mantendo a cobertura dos principais comportamentos sem aumentar desnecessariamente a quantidade de cenários.

## Organização do projeto

Os componentes reutilizáveis ficam centralizados em `cypress/support`, separados por responsabilidade:

- **pages/**: Page Objects, contendo apenas seletores e ações da interface.
- **services/**: Métodos de acesso à API utilizando `cy.request`, sem asserções.
- **factories/**: Geração de massas de dados com `@faker-js/faker`.
- **schemas/**: Schemas utilizados para validação de contratos de API com AJV.
- **constants/**: Endpoints, mensagens e demais constantes compartilhadas.
- **commands.js**: Comandos customizados do Cypress, como criação de usuários, autenticação e outras ações reutilizáveis.
- **e2e.js**: Configurações globais da suíte, incluindo a limpeza dos dados criados durante a execução dos testes.

## Execução

Instale as dependências do projeto:

```bash
npm install
```

## Rodando os testes

Após instalar as dependências, utilize um dos comandos abaixo para executar os testes:

```bash
npm test              # Executa toda a suíte
npm run test:api      # Executa apenas os testes de API
npm run test:frontend # Executa apenas os testes E2E do frontend
npm run cy:open       # Abre o Cypress em modo interativo
```

## Ambientes

- Frontend: `https://front.serverest.dev`
- API: `https://serverest.dev`