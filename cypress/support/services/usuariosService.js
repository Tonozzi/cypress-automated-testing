import { ENDPOINTS } from "../constants/endpoints";

export function criarUsuario(usuario) {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}${ENDPOINTS.usuarios}`,
    body: usuario,
    failOnStatusCode: false,
  });
}

export function excluirUsuario(id) {
  return cy.request({
    method: "DELETE",
    url: `${Cypress.env("apiUrl")}${ENDPOINTS.usuarios}/${id}`,
    failOnStatusCode: false,
  });
}
