import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Home,
  Users,
  BookOpen,
  MessageSquare,
  Heart,
} from "lucide-react";
import useCartStore from "../../store/cartStore";
import logo from "../../assets/logo1.png";

const ModernNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCartStore();

  // Calculate total items in cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Kelas",
      href: "/class",
      icon: Users,
    },
    {
      label: "Book",
      href: "/book",
      icon: BookOpen,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: MessageSquare,
    },
    {
      label: "Saweria",
      href: "https://saweria.co/dzithschess",
      icon: Heart,
      external: true,
    },
  ];

  const handleNavClick = (href, external = false) => {
    if (external) {
      // Open external links in new tab
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (href.startsWith("/#")) {
      // Handle anchor links - navigate to home first if not there
      if (window.location.pathname !== "/") {
        window.location.href = href;
      } else {
        // Scroll to section if already on home
        const sectionId = href.replace("/#", "#");
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // Direct page navigation
      window.location.href = href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-lg border-b border-white/10"
            : "bg-black/50 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
              >
                <img src={logo} alt="Dziths Chess" className="h-10 w-auto" />
                <span className="text-xl font-bold text-white hidden sm:block">
                  Dziths Chess
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleNavClick(item.href, item.external)}
                      className={`group relative px-3 py-2 text-white hover:text-red-700 transition-all duration-300 flex items-center space-x-2 ${
                        item.external ? "hover:text-red-500" : ""
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`transition-transform group-hover:scale-110 ${
                          item.external ? "text-red-400" : ""
                        }`}
                      />
                      <span className="font-medium">{item.label}</span>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700 group-hover:w-full transition-all duration-300"></div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Cart & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={() => (window.location.href = "/checkout")}
                className="relative p-2 text-white hover:text-red-700 transition-colors duration-300 group"
              >
                <ShoppingCart
                  size={24}
                  className="transition-transform group-hover:scale-110"
                />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-700 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white hover:text-red-400 transition-colors duration-300 p-2"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-lg border-t border-white/10">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.href, item.external)}
                  className={`group w-full text-left px-3 py-3 text-white hover:text-red-400 hover:bg-white/5 transition-all duration-300 flex items-center space-x-3 rounded-lg ${
                    item.external ? "hover:text-red-500" : ""
                  }`}
                >
                  <Icon
                    size={20}
                    className={`transition-transform group-hover:scale-110 ${
                      item.external ? "text-red-400" : ""
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {item.external && (
                    <span className="text-xs text-red-300 opacity-75">↗</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default ModernNav;
