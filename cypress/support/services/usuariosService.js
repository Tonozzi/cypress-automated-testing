import { ENDPOINTS } from "../constants/endpoints";

// Chamadas HTTP cruas do recurso /usuarios. Sem asserções aqui — quem valida
// são os specs. O failOnStatusCode desativado permite inspecionar respostas de
// erro nos cenários negativos e no teardown, em vez de lançar exceção.

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
