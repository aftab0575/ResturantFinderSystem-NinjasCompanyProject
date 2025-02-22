"use client"; // Ensure this runs on the client side

import {createContext, useContext, useEffect, useRef, useState, ReactNode} from "react";
import userLogo from "@/Assets/user.png";
import resLogo from "@/Assets/restaurant.png";

interface MapContextType {
  map: google.maps.Map | null;
  addMarker: (position: google.maps.LatLngLiteral, title?: string) => void;
  addRestaurantMarker: (
    position: google.maps.LatLngLiteral,
    title?: string
  ) => void;
  addUserLocation: (lat: number, lng: number) => void;
  mapContainerRef: React.RefObject<HTMLDivElement>;
  removeAllMarkers: () => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const userCircleRef = useRef<google.maps.Circle | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null); // ✅ Track map instance in state
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [lat, setLat] = useState(0);
  const [lng, setLon] = useState(0);

  useEffect(() => {
    const initializeMap = () => {
      if (window.google && mapContainerRef.current && !mapInstance.current) {
        console.log("Google Maps script detected. Initializing map...");

        mapInstance.current = new google.maps.Map(mapContainerRef.current, {
          center: { lat: 30.3753, lng: 69.3451 }, // Default center (San Francisco)
          zoom: 5,
        });

        setMap(mapInstance.current); // ✅ Store map in state
      }
    };

    // ✅ Listen for Google Maps script to load
    if (window.google) {
      initializeMap();
    } else {
      console.log("Waiting for Google Maps script...");
      window.addEventListener("google-maps-loaded", initializeMap);
    }

    return () => {
      window.removeEventListener("google-maps-loaded", initializeMap);
    };
  }, []);
  
  const addMarker = (position: google.maps.LatLngLiteral, title?: string) => {
    if (!map) {
      console.error("Map is not initialized yet!");
      return;
    }

    new google.maps.Marker({
      position,
      map,
      title,
    });
  };

  const addUserLocation = (lat: number, lng: number) => {
    setLat(lat);
    setLon(lng);

    if (!map) {
        console.log("Map is not initialized yet, waiting...");
      return;
    }

        if (userMarkerRef.current) {
          userMarkerRef.current.setMap(null);
        }

        userMarkerRef.current = new google.maps.Marker({
          position: { lat, lng },
          map,
          title: "Your Location",
          icon: {
            url: userLogo.src,
            scaledSize: new google.maps.Size(50, 55),
          },
        });
        
        if (userCircleRef.current) {
          userCircleRef.current.setMap(null);
        }

        userCircleRef.current = new google.maps.Circle({
          strokeColor: "#4285F4",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#4285F4",
          fillOpacity: 0.3,
          map,
          center: { lat, lng },
          radius: 100,
        });
  };

  const addRestaurantMarker = (
    position: google.maps.LatLngLiteral,
    title?: string
  ) => {
    if (!map) {
      console.error("Map is not initialized yet!");
      return;
    }

    new google.maps.Marker({
      position,
      map,
      title,
      icon: {
        url: resLogo.src,
        scaledSize: new google.maps.Size(80, 85),
      },
    });

    map.setCenter({ lat, lng });
  };

  const removeAllMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  return (
    <MapContext.Provider
      value={{
        map,
        addMarker,
        addRestaurantMarker,
        addUserLocation,
        removeAllMarkers,
        mapContainerRef,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
