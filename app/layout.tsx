import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MapProvider } from "@/app/context/index";
import GoMapsScript from "./components/GoMapScript/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Finder",
  description: "Find restaurants near you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const Api_Key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <html lang="en">
    <head>
        {/* ✅ Pass API Key to Client Component */}
        {Api_Key && <GoMapsScript apiKey={Api_Key} />}
      </head>
      <body className={`${inter.className} bg-gradient-to-b from-blue-300 to-blue-300 min-h-screen`}>
        {/* ✅ Render children only after script is loaded */}
        <MapProvider>
          {children}
        </MapProvider>
      </body>
    </html>
  );
  
}
