/// <reference types="cypress" />

describe("Calculator app Interface", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should render", () => {
    cy.get('[data-cy="mobile-screen"]').screenshot("App Day Mode");
  });
  describe("night mode button", () => {
    it("renders", () => {
      cy.get('[data-cy="night-mode-button"]').should("be.visible");
    });

    it("click should change screen to night-mode", () => {
      cy.get('[data-cy="night-mode-button"]').click();
      cy.get('[data-cy="night-mode-icon"]').should("have.class", "fa-sun");
      cy.get('[data-cy="mobile-screen"]').should("have.class", "night-mode");
    });
    it("should not be in night mode on first load", () => {
      cy.get('[data-cy="mobile-screen"]').should(
        "not.have.class",
        "night-mode"
      );
      cy.get('[data-cy="night-mode-icon"]').should("have.class", "fa-moon");
    });
    it("click should change screen to dark", () => {
      cy.get('[data-cy="night-mode-button"]').click();
      cy.get('[data-cy="mobile-screen"]').should(
        "have.css",
        "background-color",
        "rgb(26, 26, 26)"
      );
      cy.get('[data-cy="mobile-screen"]').should(
        "have.css",
        "color",
        "rgb(255, 255, 255)"
      );
      cy.get('[data-cy="mobile-screen"]').screenshot("App Night Mode");
    });

    it("should change back to day mode on second click", () => {
      cy.get('[data-cy="night-mode-button"]').click();
      cy.get('[data-cy="mobile-screen"]').should(
        "have.css",
        "background-color",
        "rgb(26, 26, 26)"
      );
      cy.get('[data-cy="night-mode-button"]').click();
      cy.get('[data-cy="mobile-screen"]').should(
        "have.css",
        "background-color",
        "rgb(255, 255, 255)"
      );
    });

    it("click should change action buttons css", () => {
      cy.get('[data-cy="night-mode-button"]').click();
      cy.get('[data-cy="action-button-equals"]').should(
        "have.css",
        "background-color",
        "rgb(26, 26, 26)"
      );

      cy.get('[data-cy="action-button-equals"]').should(
        "have.css",
        "color",
        "rgb(255, 255, 255)"
      );
      cy.get('[data-cy="night-mode-button"]').click();
      cy.get('[data-cy="action-button-equals"]').should(
        "have.css",
        "background-color",
        "rgb(255, 255, 255)"
      );

      cy.get('[data-cy="action-button-equals"]').should(
        "have.css",
        "color",
        "rgb(1, 124, 158)"
      );
    });
    it("click should not affect input buttons css", () => {
      cy.get('[data-cy="night-mode-button"]').click();
      cy.get('[data-cy="input-button-8"]').should(
        "have.css",
        "background-color",
        "rgb(1, 124, 158)"
      );

      cy.get('[data-cy="action-button-equals"]').should(
        "have.css",
        "color",
        "rgb(255, 255, 255)"
      );
      cy.get('[data-cy="night-mode-button"]').click();
      cy.get('[data-cy="action-button-equals"]').should(
        "have.css",
        "background-color",
        "rgb(255, 255, 255)"
      );

      cy.get('[data-cy="action-button-equals"]').should(
        "have.css",
        "color",
        "rgb(1, 124, 158)"
      );
    });
  });

  describe("results interface", () => {
    it("equal sign should not render until there is a result", () => {
      cy.get('[data-cy="equal-sign-icon"]').should("not.exist");
      cy.get('[data-cy="input-button-9"]').click();
      cy.get("[data-cy='action-button-equals']").click();
      cy.get('[data-cy="equal-sign-icon"]').should("be.visible");
    });
  });

  describe("action buttons", () => {
    beforeEach(() => {
      cy.get('[data-cy="results"]').as("Results");
      cy.get('[data-cy="display-user-input"]').as("UserInput");
      cy.get('[data-cy="action-button-backspace"]').as("Backspace");
      cy.get('[data-cy="action-button-backspace"]').as("Backspace");
      cy.get('[data-cy="action-button-clear"]').as("Clear");
      cy.get('[data-cy="input-button-9"]').click();
      cy.get('[data-cy="action-button-minus"]').click().as("Minus");
      cy.get('[data-cy="input-button-0"]').click();
      cy.get('[data-cy="input-button-."]').click();
      cy.get('[data-cy="input-button-1"]').click();
      cy.get('[data-cy="action-button-equals"]').click().as("Equals");
      cy.get('[data-cy="input-button-9"]').click();
      cy.get('[data-cy="action-button-times"]').click();
      cy.get('[data-cy="input-button-2"]').click();
    });
    describe("equal buttons", () => {
      it("should evaluate clicked buttons", () => {
        cy.get("@Equals").click();
        cy.get("@Results").should("have.text", "18");
        cy.get("@Minus").click();
        cy.get('[data-cy="input-button-2"]').click();
        cy.get("@Equals").click();
        cy.get("@Results").should("have.text", "16");
      });
    });
    describe("backspace button", () => {
      it("should clear last typed element", () => {
        cy.get("@Backspace").click();
        cy.get("@UserInput").should("have.text", "9x");
        cy.get("@Backspace").click();
        cy.get("@UserInput").should("have.text", "9");
      });
    });
    describe("clear button", () => {
      it("should clear last typed element", () => {
        cy.get("@Clear").click();
        cy.get("@UserInput").should("have.text", "");
      });
    });
  });

  // describe("", () => {
  //   it("", () => {});
  // });
  // describe("", () => {
  //   it("", () => {});
  // });
});
