export {};

describe("Products Overview", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("Get Product to view", () => {
    cy.get(".top-products")
      .scrollIntoView()
      .within(() => {
        cy.get(".view-btn").first().click();
        cy.wait(3000);

        cy.url().should("contain", "/products");

        cy.log(String(cy.url()));
      });
  });
});
