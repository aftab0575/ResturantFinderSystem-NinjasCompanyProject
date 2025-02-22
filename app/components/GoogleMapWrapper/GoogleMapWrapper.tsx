"use client";

import dynamic from "next/dynamic";

const GoogleMapComponent = dynamic(() => import("../GoogleMap/GoogleMap"), { ssr: false });

export default function GoogleMapWrapper() {
  return <GoogleMapComponent />;
}
