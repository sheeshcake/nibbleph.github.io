import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-7 px-4 md:px-8 w-full fixed top-0 z-[100] transition-all duration-300 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl font-bold flex items-center text-white"
          >
            <img src="/nibble-logo-white.svg" alt="Nibble Logo" className="h-8" />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/about"
            className="text-sm font-medium text-gray-300 hover:text-red-600 transition-colors duration-300"
          >
            ABOUT US
          </Link>
          <Link
            to="/services"
            className="text-sm font-medium text-gray-300 hover:text-red-600 transition-colors duration-300"
          >
            SERVICES
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-medium text-gray-300 hover:text-red-600 transition-colors duration-300"
          >
            PRICING
          </Link>
          <Link
            to="/blog"
            className="text-sm font-medium text-gray-300 hover:text-red-600 transition-colors duration-300"
          >
            BLOG
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-gray-300 hover:text-red-600 transition-colors duration-300"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
