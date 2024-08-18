/// <reference types='cypress' />

export default async function SignIn() {
  describe("My First Test", () => {
    context("Renders component as expected", () => {
      cy.findByText("SIGN IN").should(
        "exist",
        "Component not rendered properly"
      );
    });

    context("Sign in user", async () => {
      const rootElement = ".auth-container form";
      const email = "timijames68@gmail.com";
      const password = "112233";

      cy.get(rootElement + " input[type='text']")
        .type(email)
        .should("contain.value", email);

      cy.get(rootElement + " input[type='password']")
        .type(password)
        .should("contain.value", password);

      cy.get(".action-group button")
        .click()
        .should("be.disabled")
        .should("contain.text", "Authenticating");

      cy.wait(5000);

      it("Form redirects to homepage", () => {
        cy.url().should("not.include", "/sign");
      });
    });

    context(
      "Form didn't redirects to upload page because the user is not an admin",
      () => {
        cy.url().should("not.include", "/sign");
      }
    );
  });
}
