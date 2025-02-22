"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import Logo from "@/Assets/icon2.png"; // Replace with your actual logo

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-blue-600 shadow-xl rounded-b-3xl transition-all duration-300">
      {/* Left - Logo */}
      <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
        <Image src={Logo} alt="Enatega Logo" width={80} height={80} />
        <span className="text-3xl font-extrabold tracking-wide text-white drop-shadow-lg">
          ENATEGA
        </span>
      </div>

      {/* Right - Icons & Login */}
      <div className="flex items-center gap-6">
        {/* Login Button */}
        <Link
          href=""
          className="flex items-center gap-2 text-white hover:text-red-200 transition duration-300"
        >
          <i className="pi pi-user text-2xl transition-transform transform hover:scale-110"></i>
          <span className="font-semibold hidden md:inline">LOGIN</span>
        </Link>

        {/* Shopping Cart Button */}
        <Button
          data-testid="cart-button"
          icon="pi pi-shopping-bag"
          className="p-button-rounded p-button-text bg-transparent text-white hover:bg-gray-100 hover:text-black transition duration-300 shadow-md hover:shadow-lg"
        />
      </div>
    </nav>
  );
};

export default Navbar;
