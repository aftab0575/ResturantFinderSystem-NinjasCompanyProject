"use client";

import Script from "next/script";

interface GoMapsScriptProps {
  apiKey: string;
}

const GoMapsScript: React.FC<GoMapsScriptProps> = ({ apiKey }) => {
  if (!apiKey) {
    console.error("GoMaps API Key is missing!");
    return null;
  }

  return (
    <Script
    src={`https://maps.gomaps.pro/maps/api/js?key=${apiKey}`}
    strategy="lazyOnload"
    onLoad={() => {
      console.log("GoMaps API script loaded!");
      window.dispatchEvent(new Event("google-maps-loaded")); // ✅ Notify when loaded
    }}
  />
  );
};

export default GoMapsScript;
