import { realizarLogin } from "../../support/services/loginService";
import { MENSAGENS } from "../../support/constants/messages";
import { loginSchema } from "../../support/schemas/loginSchema";

// TC002-API: login bem sucedido
describe("TC002-API | Login", () => {
  it("deve autenticar um usuário cadastrado", () => {
    cy.criarUsuarioELogar().then(({ usuario }) => {
      realizarLogin(usuario.email, usuario.password).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq(MENSAGENS.loginOk);
        expect(res.body.authorization).to.be.a("string").and.not.be.empty;
        cy.validarSchema(loginSchema, res.body);
      });
    });
  });
//Validação de senha incorreta com o usuário cadastrado
  it("deve rejeitar login quando a senha estiver incorreta", () => {
    cy.criarUsuarioELogar().then(({ usuario }) => {
      realizarLogin(usuario.email, "senha-incorreta").then((res) => {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq(MENSAGENS.credenciaisInvalidas);
      });
    });
  });
});