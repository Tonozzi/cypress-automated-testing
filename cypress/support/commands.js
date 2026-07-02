import Ajv from "ajv";
import { gerarUsuario } from "./factories/usuarioFactory";
import { gerarProduto } from "./factories/produtoFactory";
import { criarUsuario } from "./services/usuariosService";
import { realizarLogin } from "./services/loginService";
import { criarProduto } from "./services/produtosService";

const ajv = new Ajv({ allErrors: true });

Cypress.Commands.add("validarSchema", (schema, body) => {
  const validate = ajv.compile(schema);
  const valido = validate(body);
  expect(valido, ajv.errorsText(validate.errors)).to.be.true;
});

Cypress.Commands.add("registrar", (tipo, dado) => {
  const criados = Cypress.env("criados");
  criados[tipo].push(dado);
  Cypress.env("criados", criados);
});

//cria um usuário, faz login e retorna { usuario, id, token }.
Cypress.Commands.add("criarUsuarioELogar", ({ administrador = true } = {}) => {
  const usuario = gerarUsuario({ administrador });
  return criarUsuario(usuario).then((res) => {
    // JSON.stringify(res.body) revela o erro da API caso a criação falhe.
    expect(res.status, JSON.stringify(res.body)).to.eq(201);
    cy.registrar("usuarios", { id: res.body._id });
    return realizarLogin(usuario.email, usuario.password).then((login) => {
      expect(login.status).to.eq(200);
      return cy.wrap({ usuario, id: res.body._id, token: login.body.authorization });
    });
  });
});

//Prepara a pré-condição dos fluxos de produto: cria um usuario adm, autentica e cria um produto com o token gerado.
Cypress.Commands.add("criarProdutoComAdmin", () => {
  return cy.criarUsuarioELogar({ administrador: true }).then(({ usuario, token }) => {
    const produto = gerarProduto();
    return criarProduto(produto, token).then((res) => {
      expect(res.status, JSON.stringify(res.body)).to.eq(201);
      cy.registrar("produtos", { id: res.body._id, token });
      return cy.wrap({ usuario, token, produto, produtoId: res.body._id });
    });
  });
});
