import { mount } from "cypress/react";
import Footer from "./footer";
import { PrimeReactProvider } from "primereact/api";


describe("Footer Component", () => {
  beforeEach(() => {
    mount(
    <PrimeReactProvider>
    <Footer />
    </PrimeReactProvider>
    )
  });

  it("renders the footer component", () => {
    cy.get("footer").should("exist");
  });

  it("displays the brand section with Enatega title", () => {
    cy.contains("h2", "Enatega").should("exist");
  });

  it("displays navigation links", () => {
    cy.contains("a", "Home").should("exist");
    cy.contains("a", "Privacy Policy").should("exist");
    cy.contains("a", "Terms & Conditions").should("exist");
  });

  it("displays social media buttons", () => {
    cy.get("button").should("have.length", 4);
  });

  it("simulates clicking on social media buttons", () => {
    cy.get("button").each(($btn) => {
      cy.wrap($btn).click();
    });
  });

  it("ensures copyright text is visible", () => {
    cy.contains("© 2022 All Rights Reserved").should("exist");
  });
});
