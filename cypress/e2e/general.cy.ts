import DesktopTest from "../functions/desktop";
import MobileTest from "../functions/mobile";
import SignIn from "../functions/SIGN_IN";

describe("Testing Components That Appear on all Screen (Header and Footer)", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("User get signed in and redirected to homepage", () => {
    cy.findByText("Sign In").should("exist").click(); 
    cy.wait(3000);

    cy.url().should("contain", "/sign-in");

    SignIn();
  });

  it("Sidebar is displayed based on the width of the device", () => {
    const innerWidth = Cypress.config().viewportWidth;

    if ((innerWidth as number) > 500) DesktopTest();
    else if ((innerWidth as number) < 500) MobileTest();
  });
});
