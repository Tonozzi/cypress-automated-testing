import CadastroPage from "../../support/pages/CadastroPage";
import { gerarUsuario } from "../../support/factories/usuarioFactory";
import { MENSAGENS } from "../../support/constants/messages";

//TC002-FE validação do cadastro pela interface com sucesso e rejeição de e-mail duplicado
describe("FE-02 | Cadastro", () => {
  beforeEach(() => CadastroPage.visit());

  it("deve cadastrar um novo usuário com sucesso e rejeitar e-mail duplicado", () => {
    const usuario = gerarUsuario({ administrador: false });

    cy.intercept("POST", "**/usuarios").as("cadastro");
    CadastroPage.cadastrar(usuario);
    //guarda o id retornado pela API para remover o usuário ao final da execução do teste
    cy.wait("@cadastro").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      cy.registrar("usuarios", { id: interception.response.body._id });
    });
    CadastroPage.mensagemSucesso.should("be.visible").and("contain", MENSAGENS.cadastroOk);

    //Repete o cadastro com o mesmo email para confirmar a validação da tela.
    CadastroPage.visit();
    cy.intercept("POST", "**/usuarios").as("cadastroErro");
    CadastroPage.cadastrar(usuario);
    cy.wait("@cadastroErro").its("response.statusCode").should("eq", 400);
    CadastroPage.mensagemErro.should("be.visible").and("contain", MENSAGENS.emailEmUso);
  });
});
