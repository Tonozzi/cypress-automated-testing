import "./commands";
import { excluirUsuario } from "./services/usuariosService";
import { excluirProduto } from "./services/produtosService";

//Inicializa o registro dos dados criados durante a execução dos testes.
beforeEach(() => {
  if (!Cypress.env("criados")) {
    Cypress.env("criados", { usuarios: [], produtos: [] });
  }
});

// Remove os dados criados pelos testes
after(() => {
  const criados = Cypress.env("criados") || { usuarios: [], produtos: [] };
  criados.produtos.forEach(({ id, token }) => excluirProduto(id, token));
  criados.usuarios.forEach(({ id }) => excluirUsuario(id));
});
