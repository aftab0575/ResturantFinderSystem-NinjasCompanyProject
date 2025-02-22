/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { mount } from "cypress/react";
import Navbar from "./page";
import { PrimeReactProvider } from "primereact/api";

describe("Navbar Component", () => {
  beforeEach(() => {
    mount(
      <PrimeReactProvider>
        <Navbar />
      </PrimeReactProvider>
    );
    
  });
   

  it("renders correctly", () => {
    cy.get("nav").should("exist"); // ✅ Navbar should be in the DOM
  });

  it("displays the logo correctly", () => {
    cy.get("img").should("have.attr", "alt", "Enatega Logo"); // ✅ Logo should exist with correct alt text
  });

  
  it("displays the brand name", () => {
    cy.contains("ENATEGA").should("exist"); // ✅ Brand name should be visible
  });
  

  it("should render the cart button", () => {
    cy.get("nav").should("exist"); // Ensure Navbar is loaded
    cy.get('[data-testid="cart-button"]').should(
      "be.visible"
    );
  });

  
  it("should be clickable", () => {
    cy.get('[data-testid="cart-button"]').click({ force: true });
    
  });

  it("should trigger an action when clicked", () => {cy.wait(500); // Ensure everything loads
    const clickSpy = cy.spy();

    cy.get('[data-testid="cart-button"]').then(($btn) => {
      $btn.on("click", clickSpy);
    });

    cy.get('[data-testid="cart-button"]')
      .click({ force: true })
      .then(() => {
        expect(clickSpy).to.have.been.calledOnce;
      });
  });
  
 
});
