// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password, username) => {
  cy.visit("/index.php");
  cy.get(".login").click();
  cy.get("#email").type(email);
  cy.get("#passwd").type(password, { log: false });
  cy.get("#SubmitLogin").click();
  cy.get(".account").should("have.text", username);
});

Cypress.Commands.add("logout", () => {
  cy.get(".logout").click();
  cy.get(".login").contains("Sign in");
});
