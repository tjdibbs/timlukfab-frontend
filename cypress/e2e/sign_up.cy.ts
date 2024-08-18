// https://docs.cypress.io/api/introduction/api.html
/// <reference types='cypress' />

// @ts-ignore
const { $ } = Cypress;

describe("Sign up page works fine", () => {
  before(() => {
    cy.visit("http://localhost:3000/sign-up");
  });

  it("Renders sign up page as expected", () => {
    cy.findByText("SIGN UP").should("exist", "Component not rendered properly");
  });

  it("Form submit and redirect to login page", () => {
    const firstname = "Oderinde";
    const lastname = "Oluwatimileyin";
    const email = "oderindejames02@gmail.com";
    const password = "1234";

    cy.get(".firstname_form_control input")
      .type(firstname)
      .should("contain.value", firstname);

    cy.get(".lastname_form_control input")
      .type(lastname)
      .should("contain.value", lastname);

    cy.get(".email_form_control input")
      .type(email)
      .should("contain.value", email);

    cy.get(".password_form_control input")
      .type(password)
      .should("contain.value", password);

    cy.get(".action-group button")
      .click()
      .should("be.disabled")
      .should("contain.text", "Creating account");

    cy.wait(5000);

    cy.url().should("include", "/sign-in");
  });
});
