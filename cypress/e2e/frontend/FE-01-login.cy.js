import LoginPage from "../../support/pages/LoginPage";
import { MENSAGENS } from "../../support/constants/messages";

// FE-01: login pela UI, caindo em /home + feedback de credenciais inválidas.
describe("FE-01 | Login", () => {
  beforeEach(() => LoginPage.visit());

  it("deve logar com usuário válido e ser redirecionado, e rejeitar credenciais inválidas", () => {
    // Pré-condição criada via API para o teste de UI focar só no fluxo de login.
    cy.criarUsuarioELogar({ administrador: false }).then(({ usuario }) => {
      cy.intercept("POST", "**/login").as("login");
      LoginPage.login(usuario.email, usuario.password);
      cy.wait("@login").its("response.statusCode").should("eq", 200);
      cy.url().should("include", "/home");

      // Cobertura negativa no mesmo cenário: senha errada mostra mensagem de erro.
      LoginPage.visit();
      cy.intercept("POST", "**/login").as("loginErro");
      LoginPage.login(usuario.email, "senha-incorreta");
      cy.wait("@loginErro").its("response.statusCode").should("eq", 401);
      LoginPage.mensagemErro.should("be.visible").and("contain", MENSAGENS.credenciaisInvalidas);
    });
  });
});
