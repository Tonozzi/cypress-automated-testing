// page object da home/produtos
class ProdutosPage {
  visit() {
    cy.visit("/home");
  }

  get campoPesquisar() {
    return cy.get('[data-testid="pesquisar"]');
  }

  get botaoPesquisar() {
    return cy.get('[data-testid="botaoPesquisar"]');
  }

  pesquisarProduto(nome) {
    this.campoPesquisar.clear().type(nome);
    this.botaoPesquisar.click();
  }

  // restringe o clique ao card que contém o nome do produto
  adicionarNaListaPorNome(nome) {
    cy.contains(".card", nome).within(() => {
      cy.get('[data-testid="adicionarNaLista"]').click();
    });
  }
}

export default new ProdutosPage();
