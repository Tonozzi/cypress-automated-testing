import { ENDPOINTS } from "../constants/endpoints";

// Chamadas HTTP cruas do recurso /produtos. As duas escritas exigem token de
// autenticação, que o chamador passa pelo header Authorization.

export function criarProduto(produto, token) {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}${ENDPOINTS.produtos}`,
    body: produto,
    headers: { Authorization: token },
    failOnStatusCode: false,
  });
}

export function excluirProduto(id, token) {
  return cy.request({
    method: "DELETE",
    url: `${Cypress.env("apiUrl")}${ENDPOINTS.produtos}/${id}`,
    headers: { Authorization: token },
    failOnStatusCode: false,
  });
}
