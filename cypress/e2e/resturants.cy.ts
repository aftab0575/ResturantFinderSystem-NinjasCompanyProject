describe("API Call - Fetching Restaurants", () => {
  it("fetches and displays restaurants after getting location", () => {
    // ✅ Visit the actual page where NearbyRestaurants is used
    cy.visit("/"); // Adjust if needed

    // ✅ Stub the geolocation API to provide a fake lat/lon
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((callback) => {
        callback({ coords: { latitude: 37.7749, longitude: -122.4194 } }); // Fake San Francisco location
      });
    });

    // ✅ Click "My Location" button to trigger geolocation
    cy.contains("My Location").click();

     // ✅ Click "Find Restaurants" to trigger the API call
     cy.contains("Find Restaurants 🍽️").should("exist").click();

    // ✅ Intercept the real API request
    cy.intercept("GET", "**/nearbysearch/**").as("fetchRestaurants");

    // ✅ Wait for the API response
    cy.wait("@fetchRestaurants").its("response.statusCode").should("eq", 200);

    // ✅ Check if restaurants are displayed
    cy.get(".p-card", { timeout: 20000 }).should("have.length.at.least", 2);
  });
});


// describe("NearbyRestaurants (E2E)", () => {
//     beforeEach(() => {
//       // ✅ Visit the actual page where the component is rendered
//       cy.visit("/restaurants"); // Update with the correct URL
  
//       // ✅ Stub the user's location
//       cy.window().then((win) => {
//         cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((success) => {
//           success({ coords: { latitude: 37.7749, longitude: -122.4194 } });
//         });
//       });
//     });
  
//     it("renders the component and button", () => {
//       cy.get("button").contains("Find Restaurants 🍽️").should("be.visible");
//     });
  
//     it("enables the button when lat/lon are available", () => {
//       cy.get("button").contains("Find Restaurants 🍽️").should("not.be.disabled");
//     });
  
//     it("shows loading spinner while fetching restaurants", () => {
//       cy.intercept("GET", "**/maps/api/place/nearbysearch/json**", (req) => {
//         req.reply((res) => {
//           res.delay = 1000; // Simulate network delay
//           res.send({ fixture: "mockRestaurants.json" });
//         });
//       }).as("fetchRestaurants");
  
//       cy.get("button").contains("Find Restaurants 🍽️").click();
//       cy.get(".pi-spinner").should("be.visible"); // ✅ Check for spinner
//       cy.wait("@fetchRestaurants");
//       cy.get(".pi-spinner").should("not.exist"); // ✅ Spinner should disappear
  
//       // ✅ Ensure restaurant cards are displayed
//       cy.get(".p-card").should("have.length.at.least", 1);
//     });
  
//     it("shows an error message when the API request fails", () => {
//       cy.intercept("GET", "**/maps/api/place/nearbysearch/json**", {
//         statusCode: 500,
//         body: { status: "ERROR" },
//       }).as("fetchError");
  
//       cy.get("button").click();
//       cy.wait("@fetchError");
  
//       // ✅ Check for error message in UI
//       cy.get("[data-cy=error-message]").should("be.visible").and("contain", "Failed to load restaurants");
  
//       // ✅ Check for console error
//       cy.window().then((win) => {
//         cy.spy(win.console, "error").as("consoleError");
//       });
//       cy.get("@consoleError").should("be.calledWith", "Error fetching places:", "ERROR");
//     });
//   });
  