import { ENDPOINTS } from "../constants/endpoints";

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
