import React from "react";
import UserLocationButton from "./page";
import { mount } from "cypress/react";
import { MapProvider } from "@/app/context/index"; // ✅ Wrap with MapProvider
describe("UserLocationButton E2E Test", () => {
  beforeEach(() => {
    cy.visit("/"); // Ensure the correct URL
    cy.intercept("GET", "**/maps/api/geocode/**", {
      statusCode: 200,
      body: { results: [{ formatted_address: "New York, USA" }], status: "OK" },
    }).as("getLocation");
  });

  it("renders correctly", () => {
    cy.get("button").should("contain", "My Location");
    cy.get("input").should(
      "have.attr",
      "placeholder",
      "Fetching your location..."
    );
  });

  it("handles geolocation success", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
        (success) => {
          success({ coords: { latitude: 40.7128, longitude: -74.006 } });
        }
      );
    });

    cy.get("button").click();
    cy.wait("@getLocation");
    cy.get("input").should("have.value", "New York, USA");
  });

  it("shows loading state when fetching", () => {
    cy.get("button").click();
    cy.get(".pi-spinner").should("be.visible");
  });

  it("handles geolocation error", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
        (_, error) => {
          error({ code: 1, message: "User denied location access" });
        }
      );
    });

    cy.get("button").click();
    cy.get("input").should("have.value", "Error getting location");
    cy.get("button").should("be.disabled");
  });

  it("displays error when API fails", () => {
    cy.intercept("GET", "**/maps/api/geocode/**", { statusCode: 500 }).as(
      "getLocationFail"
    );

    cy.get("button").click();
    cy.wait("@getLocationFail");
    cy.get("input").should("have.value", "Error fetching location");
  });

  it("centers the map at user's location when clicking My Location", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
        (success) => {
          success({ coords: { latitude: 33.6980552, longitude: 72.9709042 } });
        }
      );
    });

    cy.intercept("GET", "**/maps/api/geocode/**", {
      statusCode: 200,
      body: {
        results: [{ formatted_address: "Islamabad, Pakistan" }],
        status: "OK",
      },
    }).as("getLocation");

    cy.get("button").click();
    cy.wait("@getLocation");
    cy.get("input").should("have.value", "Islamabad, Pakistan");
  });
});
