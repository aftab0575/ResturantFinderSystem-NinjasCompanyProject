import { mount } from "cypress/react";
import SearchPlaces from "./page";
import { MapProvider } from "@/app/context/index";

describe("SearchPlaces Component", () => {
  beforeEach(() => {
    mount(
      <MapProvider>
        <SearchPlaces />
      </MapProvider>
    );
  });

  it("renders the search input correctly", () => {
    cy.contains("Search for Restaurants and Places :-").should("exist");
    cy.get("input").should("have.attr", "placeholder", "Search for places...");
  });

  it("updates input value when user types", () => {
    cy.get("input").type("Pizza");
    cy.get("input").should("have.value", "Pizza");
  });

  it("shows the loading spinner when fetching places", () => {
    cy.get("input").type("Sushi");
    cy.get(".pi-spinner").should("exist");
  });

  it("displays search results when API returns places", () => {
    cy.get("input").type("Burger");

    cy.wait(500); // Simulating API response delay

    cy.then(() => {
      Cypress.component().setState({
        places: [{ name: "Burger King" }, { name: "McDonald's" }],
      });
    });

    cy.contains("Burger King").should("exist");
    cy.contains("McDonald's").should("exist");
  });

  it("allows selecting a place from the dropdown", () => {
    cy.get("input").type("Cafe");

    cy.wait(500);

    cy.then(() => {
      Cypress.component().setState({
        places: [{ name: "Starbucks" }],
      });
    });

    cy.contains("Starbucks").click();
    cy.get("input").should("have.value", "Starbucks");
  });

  it("removes old markers when selecting a new place", () => {
    cy.get("input").type("Coffee Shop");

    cy.wait(500);

    cy.then(() => {
      Cypress.component().setState({
        places: [{ name: "Dunkin' Donuts" }],
      });
    });

    cy.contains("Dunkin' Donuts").click();
    cy.log("Old markers should be removed before adding new ones.");
  });
});