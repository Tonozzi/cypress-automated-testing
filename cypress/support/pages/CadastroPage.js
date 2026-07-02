// Page Object da tela de cadastro de usuários
class CadastroPage {
  visit() {
    cy.visit("/cadastrarusuarios");
  }

  get campoNome() {
    return cy.get('[data-testid="nome"]');
  }

  get campoEmail() {
    return cy.get('[data-testid="email"]');
  }

  get campoPassword() {
    return cy.get('[data-testid="password"]');
  }

  get checkboxAdministrador() {
    return cy.get('[data-testid="checkbox"]');
  }

  get botaoCadastrar() {
    return cy.get('[data-testid="cadastrar"]');
  }

  get mensagemSucesso() {
    return cy.get(".alert-primary .alert-link");
  }

  get mensagemErro() {
    return cy.get(".alert-secondary span");
  }

  // Preenche o formulário a partir de um objeto de usuário. 
  cadastrar({ nome, email, password, administrador }) {
    this.campoNome.clear().type(nome);
    this.campoEmail.clear().type(email);
    this.campoPassword.clear().type(password);
    if (administrador === "true") {
      this.checkboxAdministrador.check();
    }
    this.botaoCadastrar.click();
  }
}

export default new CadastroPage();
