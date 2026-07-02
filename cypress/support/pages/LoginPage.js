// page object da tela de login
class LoginPage {
  visit() {
    cy.visit("/login");
  }

  get campoEmail() {
    return cy.get('[data-testid="email"]');
  }

  get campoSenha() {
    return cy.get('[data-testid="senha"]');
  }

  get botaoEntrar() {
    return cy.get('[data-testid="entrar"]');
  }

  get mensagemErro() {
    return cy.get(".alert-secondary span");
  }

  //preenche o formulário e envia
  login(email, senha) {
    this.campoEmail.clear().type(email);
    this.campoSenha.clear().type(senha);
    this.botaoEntrar.click();
  }
}

//Exportado como singleton 
export default new LoginPage();
