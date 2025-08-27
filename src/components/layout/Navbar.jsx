import React, { useState } from "react";
import GooeyNav from "../common/GooeyNav";
import CartIcon from "../common/CartIcon";
import { X } from "lucide-react";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const items = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="navbar fixed top-0 z-50 text-white bg-black/30 backdrop-blur-md w-full">
      {/* START */}
      <div className="flex-1">
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="btn btn-ghost lg:hidden"
          aria-label="Open mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <a className="btn btn-ghost text-xl text-white">FulanChess</a>
      </div>

      {/* CENTER - Desktop Navigation */}
      <div className="hidden lg:flex navbar-center">
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      {/* END - Cart */}
      <div className="flex-none">
        <CartIcon />
      </div>

      {/* MOBILE FULL SCREEN MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4 lg:hidden transition-all">
          {/* Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            aria-label="Close mobile menu"
          >
            <X className="w-6 h-6" />
          </button>

          {/* GooeyNav in Mobile */}
          <div className="w-full max-w-sm">
            <GooeyNav
              items={items}
              particleCount={12}
              particleDistances={[70, 10]}
              particleR={80}
              initialActiveIndex={0}
              animationTime={500}
              timeVariance={300}
              colors={[1, 2, 3, 4]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
