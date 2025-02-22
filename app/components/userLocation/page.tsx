"use client";

import { useState, useEffect } from "react";
import { useMap } from "@/app/context/index";

const UserLocationButton = () => {
  const { map, addUserLocation } = useMap();
  const [locationName, setLocationName] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [location, setLocation] = useState<{ lat: number | null; lon: number | null }>({ lat: null, lon: null });

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

 
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        setIsFetching(true);

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });

            // Fetch address using Google Maps Reverse Geocoding API
            const geocodeUrl = `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

            try {
              const response = await fetch(geocodeUrl);
              const data = await response.json();
              if (data.status === "OK" && data.results.length > 0) {
                setLocationName(data.results[0].formatted_address);
              } else {
                setLocationName("Location not found");
              }
            } catch (error) {
              console.error("Error fetching location:", error);
              setLocationName("Error fetching location");
            } finally {
              setIsFetching(false);
            }
          },
          (error) => {
            console.error("Error getting user location:", error);
            setLocationName("Error getting location");
            setIsFetching(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLocationName("Geolocation not supported");
      }

    };

    useEffect(() => {
    fetchUserLocation();
     }, []); // Run once on mount

     // ✅ Ensure `addUserLocation` is only called after `map` is initialized
  useEffect(() => {
    if (map && location.lat !== null && location.lon !== null) {
      console.log("Map is initialized, adding user location...");
      addUserLocation(location.lat, location.lon);
    }
  }, [map, location.lat, location.lon]); // ✅ Runs when `map` is set and location is fetched

  // ✅ Center the map at the user’s current location when clicking the button
  const handleCenterMap = () => {
    
    if (map && location.lat !== null && location.lon !== null) {
      map.setCenter({ lat: location.lat, lng: location.lon });
      map.setZoom(15);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        {/* 📍 Location Display */}
        <div className="relative flex-grow">
          <input
            type="text"
            value={locationName}
            readOnly
            className="p-3 border border-gray-300 rounded-lg w-full shadow-sm 
              focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300 pr-12"
            placeholder="Fetching your location..."
          />

          {/* 🔄 Loading Indicator (Shows only when fetching) */}
          {isFetching && (
            <i className="pi pi-spin pi-spinner absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300"></i>
          )}
        </div>

        {/* 🗺️ My Location Button */}
        <button
          onClick={handleCenterMap}
          disabled={location.lat === null || location.lon === null}
          className={`p-3 bg-green-500 text-white font-semibold rounded-lg shadow-md 
            hover:bg-blue-600 transition-all duration-300 flex items-center gap-2  active:bg-red-200 active:bg-none
            ${location.lat === null || location.lon === null ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <i className="pi pi-compass"></i>
          My Location
        </button>
      </div>
    </div>
  );
};

export default UserLocationButton;
