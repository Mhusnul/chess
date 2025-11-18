import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Home,
  Users,
  BookOpen,
  MessageSquare,
  Heart,
  GraduationCap,
  Crown,
  ChevronDown,
} from "lucide-react";
import useCartStore from "../../store/cartStore";
import logo from "../../assets/logo1.png";

const ModernNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // desktop hover index
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null); // mobile submenu index
  const [dropdownTimer, setDropdownTimer] = useState(null); // timer for hover delay
  const { items } = useCartStore();

  const totalItems = items.reduce((sum, it) => sum + (it.quantity || 0), 0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Kelas", href: "/class", icon: GraduationCap },
    { label: "Book", href: "/book", icon: BookOpen },
    { label: "Komunitas", href: "/community", icon: Users },
    { label: "Contact", href: "/contact", icon: MessageSquare },
    {
      label: "Donasi",
      href: "#",
      icon: Heart,
      submenu: [
        {
          label: "Saweria",
          href: "https://saweria.co/dzithschess",
          external: true,
        },
        {
          label: "Sociabuzz",
          href: "https://sociabuzz.com/dziths",
          external: true,
        },
      ],
    },
  ];

  const handleNavClick = (href, external = false) => {
    if (external) return window.open(href, "_blank", "noopener,noreferrer");
    if (href.startsWith("/#")) {
      if (window.location.pathname !== "/")
        return (window.location.href = href);
      const el = document.querySelector(href.replace("/", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return setIsMobileMenuOpen(false);
    }
    window.location.href = href;
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-shadow ${
        isScrolled ? "backdrop-blur bg-black/70 shadow-md" : "bg-black/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
          >
            <img src={logo} alt="Dziths Chess" className="h-8 sm:h-10 w-auto" />
            <span className="text-lg sm:text-xl font-bold text-white hidden sm:block">
              Dziths Chess
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, idx) => {
              if (item.submenu) {
                return (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={() => {
                      if (dropdownTimer) clearTimeout(dropdownTimer);
                      setOpenDropdown(idx);
                    }}
                    onMouseLeave={() => {
                      const timer = setTimeout(() => {
                        setOpenDropdown(null);
                      }, 250);
                      setDropdownTimer(timer);
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(openDropdown === idx ? null : idx)
                      }
                      className="group relative px-3 py-2 text-white hover:text-red-700 transition-all duration-300 flex items-center space-x-2"
                    >
                      <item.icon
                        size={18}
                        className="transition-transform group-hover:scale-110"
                      />
                      <span className="font-medium">{item.label}</span>
                      <ChevronDown size={14} className="ml-1 opacity-80" />
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700 group-hover:w-full transition-all duration-300" />
                    </button>

                    {openDropdown === idx && (
                      <div
                        className="absolute left-0 mt-2 w-44 bg-black/95 rounded-md shadow-lg border border-white/10 py-2 z-50"
                        onMouseEnter={() => {
                          if (dropdownTimer) clearTimeout(dropdownTimer);
                        }}
                        onMouseLeave={() => {
                          const timer = setTimeout(() => {
                            setOpenDropdown(null);
                          }, 250);
                          setDropdownTimer(timer);
                        }}
                      >
                        {item.submenu.map((s, si) => (
                          <button
                            key={si}
                            type="button"
                            onClick={() => handleNavClick(s.href, s.external)}
                            className="w-full text-left px-3 py-2 text-white hover:bg-white/5 transition-colors duration-150 flex items-center justify-between"
                          >
                            <span className="text-sm">{s.label}</span>
                            {s.external && (
                              <span className="text-xs text-red-300">↗</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleNavClick(item.href, item.external)}
                  className={`group relative px-3 py-2 text-white hover:text-red-700 transition-all duration-300 flex items-center space-x-2 ${
                    item.external ? "hover:text-red-500" : ""
                  }`}
                >
                  <item.icon
                    size={18}
                    className={`transition-transform group-hover:scale-110 ${
                      item.external ? "text-red-400" : ""
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700 group-hover:w-full transition-all duration-300" />
                </button>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
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

        {/* Mobile nav area */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out w-full ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 bg-black/95 backdrop-blur-lg border-t border-white/10 w-full">
            {navItems.map((item, idx) => {
              if (item.submenu) {
                const open = mobileOpenIndex === idx;
                return (
                  <div key={idx} className="w-full">
                    <button
                      type="button"
                      onClick={() => setMobileOpenIndex(open ? null : idx)}
                      className="group w-full text-left px-3 py-3 text-white hover:text-red-400 hover:bg-white/5 transition-all duration-300 flex items-center justify-between rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon
                          size={20}
                          className="transition-transform group-hover:scale-110"
                        />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`${open ? "transform rotate-180" : ""}`}
                      />
                    </button>

                    {open && (
                      <div className="pl-8 mt-1 space-y-1">
                        {item.submenu.map((s, si) => (
                          <button
                            key={si}
                            type="button"
                            onClick={() => handleNavClick(s.href, s.external)}
                            className="w-full text-left px-3 py-2 text-white hover:text-red-400 hover:bg-white/5 transition-all duration-150 rounded-md"
                          >
                            <span className="text-sm">{s.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleNavClick(item.href, item.external)}
                  className="group w-full text-left px-3 py-3 text-white hover:text-red-400 hover:bg-white/5 transition-all duration-300 flex items-center space-x-3 rounded-lg"
                >
                  <item.icon
                    size={20}
                    className="transition-transform group-hover:scale-110"
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ModernNav;
