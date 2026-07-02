import { gerarProduto } from "../../support/factories/produtoFactory";
import { criarProduto } from "../../support/services/produtosService";
import { MENSAGENS } from "../../support/constants/messages";
import { produtoCriadoSchema } from "../../support/schemas/produtoSchema";

// TC003-API: validação do cadastro de produto com credenciais válidas e obrigatoriedade do token.
describe("TC003-API | Produtos", () => {
  it("deve criar produto autenticado como admin e rejeitar sem token", () => {
    cy.criarUsuarioELogar({ administrador: true }).then(({ token }) => {
      const produto = gerarProduto();

      criarProduto(produto, token).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq(MENSAGENS.cadastroOk);
        expect(res.body._id).to.be.a("string").and.not.be.empty;
        cy.validarSchema(produtoCriadoSchema, res.body);
        cy.registrar("produtos", { id: res.body._id, token });
      });

      //Confirmação de que a API bloqueia a criação quando a criação é feita sem token
      criarProduto(gerarProduto(), "").then((res) => {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq(MENSAGENS.tokenAusente);
      });
    });
  });
});
