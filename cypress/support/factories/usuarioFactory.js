import { faker } from "@faker-js/faker";

// payload de usuário com credenciais unicas  
export function gerarUsuario({ administrador = true } = {}) {
  return {
    nome: faker.person.fullName(),
    email: `${faker.string.uuid()}@serverest-cypress.com`,
    password: faker.internet.password({ length: 10 }),
    administrador: String(administrador), 
  };
}
