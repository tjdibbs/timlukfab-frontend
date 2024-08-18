// https://docs.cypress.io/api/introduction/api.html
/// <reference types='cypress' />

import SignIn from "../functions/SIGN_IN";

describe("Uploading dashboard uploads product", () => {
  before(() => {
    // Visit sign-in page with a  redirect to uploader page
    // Page redirects after signing in, if it has redirects param
    cy.visit("https://pauloxuries.com/sign-in?redirect=/products/upload");
  });

  it("Product Uploader dashboard renders correctly", () => {
    SignIn();

    cy.url().should("include", "/products/upload");
    cy.findByText("Upload Product").should(
      "exist",
      "Component not rendered properly"
    );
  });

  it("Form input receives values", () => {
    const title = "The product title";
    const price = 1000000;
    const sizes = ["md", "xl", 40];
    const stock = 100;
    const discountPercentage = 12;
    const colors = ["green", "white", "red"];
    const description = "The product description";
    const brand = "Apple";
    const category = "gadget";

    cy.get("input[type='file']").each((ele, i) => {
      if (i < 2) cy.wrap(ele).attachFile(`../asset/images/image${i + 1}.png`);
      else
        cy.wrap(ele).attachFile([
          `../asset/images/image1.png`,
          `../asset/images/image2.png`,
          `../asset/images/image3.png`,
        ]);
    });

    cy.get("input[name='title']").type(title).should("have.value", title);
    // @ts-ignore
    cy.wrap(Cypress.$("input[name='title']")).snapshot({
      name: "Product title",
    });

    // Enter product price and must match value format
    context("Price input receives value and format it to localeString", () => {
      cy.get("input[name='price']")
        .type(price.toString())
        .should("have.value", price.toLocaleString("en"))
        .then((elem) => {
          //  @ts-ignore
          cy.wrap({ value: Cypress.$(elem).val() }).snapshot({
            name: "Formatted Price Value",
          });
        });
    });

    // Enter discountPercentage
    cy.get("input[name='discountPercentage']")
      .type(discountPercentage.toString())
      .should("have.value", discountPercentage);

    // Product Stock field is also a required feild
    cy.get("input[name='stock']")
      .type(stock.toString())
      .should("have.value", stock);

    cy.get("input[name='brand']").type(brand).should("have.value", brand);
    cy.get("input[name='category']")
      .type(category)
      .should("have.value", category);

    cy.get("textarea[name='description']")
      .type(description)
      .should("have.value", description);

    // Select different size of the product available
    cy.wrap(sizes).each((key: string) => {
      cy.get(".sizes").findByText(key).click();
    });

    // Select different colors of the product available
    cy.wrap(colors).each((key: string) => {
      cy.get(".colors").findByText(key).click();
    });
  });

  // Then Submit To Upload
  it("Submit button got disable when an upload action is active", () => {
    cy.get(".action-group button[type='submit']")
      .should("exist")
      .click()
      .should("be.disabled")
      .should("have.text", "Uploading...");
  });

  it("Display Successful message after uploading product", () => {
    cy.wait(3000);
    cy.findByText("Product Uploaded Successfully").should("exist");
  });
});
