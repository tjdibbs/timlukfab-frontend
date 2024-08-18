/// <reference types='cypress' />

export default function MobileTest() {
  describe("Expected Mobile Components", () => {
    context(
      "Sidebar toggler is visible and functional on mobile screen",
      () => {
        cy.get(".sidebar-toggle")
          .should("exist", "Sidebar toggle button does not exist")
          .click();
      }
    );

    context("Sidebar show when sidebar toggle is clicked", () => {
      cy.get(".shop-sidebar").should("be.visible");
    });

    context(
      "Sidebar hides when a click event happen outside it border content",
      () => {
        cy.get("body").click(350, 100);
      }
    );

    // @ts-ignore
    cy.get(".shop-sidebar").snapshot();
  });
}
