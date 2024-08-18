/// <reference types="cypress" />

import { nanoid } from "nanoid";
import Cart from "pages/cart";
import mockRouter from "next-router-mock";
import WrapWithRedux from "../fixtures/ReduxProvider";
import { NextRouter } from "next/router";

const user = {
  id: nanoid(),
  email: "oderindejames02@gmail.com",
  firstname: "Timi",
  lastname: "James",
  image: "",
  admin: false,
  wishlist: [],
  verified: true,
  cart: [],
};

// jest.mock("next/router", () => require("next-router-mock"));

describe("HomeComponent.cy.ts", () => {
  it("playground", () => {
    cy.mount(
      <WrapWithRedux>
        <Cart user={user} />
      </WrapWithRedux>
    );
  });
});
