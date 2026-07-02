import { ENDPOINTS } from "../constants/endpoints";

export function realizarLogin(email, password) {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}${ENDPOINTS.login}`,
    body: { email, password },
    failOnStatusCode: false,
  });
}
