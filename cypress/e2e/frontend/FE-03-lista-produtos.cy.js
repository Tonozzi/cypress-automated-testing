import LoginPage from "../../support/pages/LoginPage";
import ProdutosPage from "../../support/pages/ProdutosPage";
import ListaProdutosPage from "../../support/pages/ListaProdutosPage";

// TC003-FE: pesquisar um produto, adicioná-lo à lista e confirmar que ele aparece na lista
describe("FE-03 | Lista de produtos", () => {
  it("deve adicionar um produto à lista e validar que ele aparece na lista", () => {
    //Prepara pela API o produto que será buscado e o usuário que fará a ação na interface.
    cy.criarProdutoComAdmin().then(({ produto }) => {
      cy.criarUsuarioELogar({ administrador: false }).then(({ usuario }) => {
        LoginPage.visit();
        cy.intercept("POST", "**/login").as("login");
        LoginPage.login(usuario.email, usuario.password);
        cy.wait("@login").its("response.statusCode").should("eq", 200);
        cy.url().should("include", "/home");

      
        cy.intercept("GET", "**/produtos?nome=*").as("pesquisa");
        ProdutosPage.pesquisarProduto(produto.nome);
        cy.wait("@pesquisa").its("response.statusCode").should("eq", 200);

        ProdutosPage.adicionarNaListaPorNome(produto.nome);
        cy.url().should("include", "/minhaListaDeProdutos");
        ListaProdutosPage.produtosNaLista.should("contain", produto.nome);
      });
    });
  });
});
