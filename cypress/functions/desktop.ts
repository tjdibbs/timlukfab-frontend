export default function DesktopTest() {
  describe("Expected Desktop Components", () => {
    context("Sidebar toggler is not visible", () => {
      cy.get(".sidebar-toggle").should(
        "not.exist",
        "Sidebar toggle button is visible on desktop view"
      );
    });

    context("Desktop navigation menu exist", () => {
      cy.get(".desktop-menu-wrapper").should("exist");
    });
  });
}
