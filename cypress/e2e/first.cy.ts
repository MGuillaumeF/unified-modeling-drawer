// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../src/support" />

// check this file using TypeScript if available
// @ts-check

import specTitle from "cypress-sonarqube-reporter/specTitle";
// import { CyHttpMessages } from "cypress/types/net-stubbing";

const ROOT_PATH = "/";

describe(specTitle("Page Access"), () => {
  it("Visite page", () => {
    // cy.clearViewport();
    cy.visit(ROOT_PATH);
    cy.addPresentation("Settings");
    cy.get("body");
  });
});
