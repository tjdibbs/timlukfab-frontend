// https://docs.cypress.io/api/introduction/api.html
/// <reference types='cypress' />

import SignIn from "../functions/SIGN_IN";

describe("USer Authetication", () => {
  before(() => {
    cy.visit("http://localhost:3000/sign-in");
  });
  it("It Signs User and Redirect to home page", () => {
    SignIn();
  });
});
