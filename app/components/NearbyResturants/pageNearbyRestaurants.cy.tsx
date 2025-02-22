import { mount } from "cypress/react";
import NearbyRestaurants from "./page"; // Correct component path
import { MapProvider } from "@/app/context"; // Ensure correct path

describe("NearbyRestaurants Component", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://maps.gomaps.pro/maps/api/place/nearbysearch/json*",
      {
        statusCode: 200,
        body: {
          status: "OK",
          results: [
            {
              name: "Test Restaurant",
              vicinity: "123 Food Street",
              rating: 4.5,
              price_level: 2,
              geometry: {
                location: { lat: 40.7128, lng: -74.006 },
              },
              photos: [{ photo_reference: "AVzFdbnM-OznjWm_5EDN64GAt5BbubqgohDnVP7BzHKgG-z4mk2WjcJVz_u93ziHN4sb78Bl7kOoHF1vCwXLiZRKdGj3FbGuf7C9hH1-7cXR_kmqwePR0K_KnWzUND8IucjBhx_dopz4wGr0W8jjSrUoRxIKoy2TJr9PVg7zYlTs7NBL1XLJ" }],
            },
          ],
        },
      }
    ).as("fetchRestaurants");
  });

  it("renders correctly", () => {
    mount(
      <MapProvider>
        <NearbyRestaurants />
      </MapProvider>
    );
    cy.contains("Find Restaurants Around You 🍽️").should("exist");
  });

  it("shows loading state when fetching restaurants", () => {
    mount(
      <MapProvider>
        <NearbyRestaurants />
      </MapProvider>
    );
    cy.contains("Find Restaurants Around You 🍽️").click();
  });

   describe("API Call - Fetching Restaurants", () => {
    it("GET call", () => {
      cy.request(
        "GET",
        "https://maps.gomaps.pro/maps/api/place/nearbysearch/json?keyword=restaurant&location=33.6980173,72.9708844&radius=1000&type=restaurant&key=AlzaSyfKKjuQsm9nrSSbue5C4KMAvrewkFp84hO"
      )
        .its("status")
        .should("equal", 200)
        .as("getData");

    });
  });
});

