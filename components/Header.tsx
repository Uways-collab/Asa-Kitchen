"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "The Sanctuary", href: "#sanctuary" },
  { label: "Treatments", href: "#treatments" },
  { label: "Rituals & Packages", href: "#packages" },
  { label: "Our Expertise", href: "#expertise" },
  { label: "The Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="transition-transform duration-300 group-hover:scale-105">
                  <circle cx="18" cy="18" r="16" stroke={isScrolled ? "#233D32" : "#F8F5EF"} strokeWidth="1.5" fill="none"/>
                  <path d="M18 8 C18 8, 12 14, 12 20 C12 24, 15 27, 18 27 C21 27, 24 24, 24 20 C24 14, 18 8, 18 8Z" fill="none" stroke={isScrolled ? "#233D32" : "#F8F5EF"} strokeWidth="1.2"/>
                  <path d="M18 12 L18 24" stroke={isScrolled ? "#233D32" : "#F8F5EF"} strokeWidth="0.8"/>
                  <path d="M15 16 Q18 14, 21 16" stroke={isScrolled ? "#233D32" : "#F8F5EF"} strokeWidth="0.8" fill="none"/>
                  <path d="M14 20 Q18 18, 22 20" stroke={isScrolled ? "#233D32" : "#F8F5EF"} strokeWidth="0.8" fill="none"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-serif text-xl lg:text-2xl font-medium tracking-wide transition-colors duration-500 ${
                    isScrolled ? "text-forest" : "text-ivory"
                  }`}
                >
                  Beauty Endowed
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-xs tracking-widest uppercase transition-colors duration-300 hover:opacity-70 ${
                    isScrolled ? "text-charcoal" : "text-ivory"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#booking")}
                className="btn-primary text-xs !py-3 !px-6"
                style={
                  !isScrolled
                    ? { backgroundColor: "transparent", border: "1px solid #F8F5EF", color: "#F8F5EF" }
                    : {}
                }
              >
                Reserve Your Experience
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? "text-forest" : "text-ivory"
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-forest transition-all duration-500 lg:hidden flex flex-col justify-center items-center ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 text-ivory p-2"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        <nav className="flex flex-col items-center gap-8">
          {navItems.map((item, i) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="font-serif text-3xl text-ivory/90 hover:text-ivory transition-all duration-300"
              style={{
                animationDelay: `${i * 0.1}s`,
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#booking")}
            className="mt-6 btn-primary text-sm"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.5s ease ${navItems.length * 0.1}s, transform 0.5s ease ${navItems.length * 0.1}s`,
            }}
          >
            Reserve Your Experience
          </button>
        </nav>

        <div
          className="absolute bottom-10 text-center"
          style={{
            opacity: mobileOpen ? 1 : 0,
            transition: "opacity 0.5s ease 0.8s",
          }}
        >
          <p className="text-ivory/50 text-xs tracking-widest uppercase">Ketu, Lagos</p>
          <p className="text-ivory/70 text-sm mt-1">0803 441 5260</p>
        </div>
      </div>
    </>
  );
}
