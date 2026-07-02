import { gerarUsuario } from "../../support/factories/usuarioFactory";
import { criarUsuario } from "../../support/services/usuariosService";
import { MENSAGENS } from "../../support/constants/messages";
import { usuarioCriadoSchema } from "../../support/schemas/usuarioSchema";

// TC001-API Validação do cadastro do usuário com credenciais válidas e rejeição de email duplicado. 
describe("TC001-API | Usuários", () => {
  it("deve criar um usuário com dados válidos e rejeitar e-mail duplicado", () => {
    const usuario = gerarUsuario({ administrador: false });

    criarUsuario(usuario).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.eq(MENSAGENS.cadastroOk);
      expect(res.body._id).to.be.a("string").and.not.be.empty;
      cy.validarSchema(usuarioCriadoSchema, res.body);
      cy.registrar("usuarios", { id: res.body._id });

      // reutilização do mesmo email para confirmar se emails duplicados são rejeitados
      criarUsuario(usuario).then((res2) => {
        expect(res2.status).to.eq(400);
        expect(res2.body.message).to.eq(MENSAGENS.emailEmUso);
      });
    });
  });
});
