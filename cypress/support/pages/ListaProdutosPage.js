// Page Object da /minhaListaDeProdutos
class ListaProdutosPage {
  visit() {
    cy.visit("/minhaListaDeProdutos");
  }

  get produtosNaLista() {
    return cy.get('[data-testid="shopping-cart-product-name"]');
  }
}

export default new ListaProdutosPage();
