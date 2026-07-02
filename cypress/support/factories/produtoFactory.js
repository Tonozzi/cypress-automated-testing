import { faker } from "@faker-js/faker";

// payload de produto
export function gerarProduto() {
  return {
    nome: `${faker.commerce.productName()} ${faker.string.uuid().slice(0, 8)}`,
    preco: faker.number.int({ min: 10, max: 1000 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 1, max: 100 }),
  };
}
