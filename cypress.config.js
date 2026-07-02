const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    // Timeouts um pouco maiores porque o ambiente é público e compartilhado.
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    // Repete specs que falharem no CI para absorver a flakiness do servidor compartilhado.
    retries: { runMode: 2, openMode: 0 },
    env: {
      // URL base da API, lida via Cypress.env("apiUrl") na camada de services.
      apiUrl: "https://serverest.dev",
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
