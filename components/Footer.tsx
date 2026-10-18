"use client";

import { Phone, MapPin, Clock, Heart } from "lucide-react";

const footerNav = [
  {
    title: "Navigate",
    links: [
      { label: "The Sanctuary", href: "#sanctuary" },
      { label: "Treatments", href: "#treatments" },
      { label: "Rituals & Packages", href: "#packages" },
      { label: "Our Expertise", href: "#expertise" },
      { label: "The Gallery", href: "#gallery" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Treatments",
    links: [
      { label: "Massage Therapy", href: "#treatments" },
      { label: "Facials & Skincare", href: "#treatments" },
      { label: "Body Rituals & Hammam", href: "#treatments" },
      { label: "Hands & Feet", href: "#treatments" },
      { label: "Signature Packages", href: "#packages" },
      { label: "Bespoke Booking", href: "#booking" },
    ],
  },
];

export default function Footer() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-forest text-ivory">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="16" stroke="#D9C4A5" strokeWidth="1.5" fill="none"/>
                <path d="M18 8 C18 8, 12 14, 12 20 C12 24, 15 27, 18 27 C21 27, 24 24, 24 20 C24 14, 18 8, 18 8Z" fill="none" stroke="#D9C4A5" strokeWidth="1.2"/>
                <path d="M18 12 L18 24" stroke="#D9C4A5" strokeWidth="0.8"/>
                <path d="M15 16 Q18 14, 21 16" stroke="#D9C4A5" strokeWidth="0.8" fill="none"/>
                <path d="M14 20 Q18 18, 22 20" stroke="#D9C4A5" strokeWidth="0.8" fill="none"/>
              </svg>
              <span className="font-serif text-xl text-ivory">Beauty Endowed</span>
            </div>
            <p className="text-ivory/60 text-sm leading-relaxed">
              Beauty Endowed is a private beauty and wellness sanctuary in Ketu, Lagos,
              offering personalized skincare, restorative massage, hammam-inspired
              bathing rituals, and thoughtful self-care experiences.
            </p>
          </div>

          {/* Nav columns */}
          {footerNav.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-champagne mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleClick(link.href)}
                      className="text-ivory/60 text-sm hover:text-ivory transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-champagne mb-6">
              Visit & Connect
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-ivory/40 mt-0.5 flex-shrink-0" />
                <p className="text-ivory/60 text-sm">
                  45, Demurin Road, Opposite Herbinco Pharmacy, Ketu, Lagos
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-ivory/40 flex-shrink-0" />
                <a href="tel:08034415260" className="text-ivory/60 text-sm hover:text-ivory transition-colors">
                  0803 441 5260
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={14} className="text-ivory/40 mt-0.5 flex-shrink-0" />
                <div className="text-ivory/60 text-sm">
                  <p>Mon – Sat: 9AM – 7PM</p>
                  <p>Sun: 12PM – 6PM</p>
                </div>
              </div>
              <a
                href="https://wa.me/2348034415260?text=Hello%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20Beauty%20Endowed."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-champagne hover:text-ivory transition-colors mt-2"
              >
                Book on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory/40 text-xs">
            © 2026 Beauty Endowed. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleClick("#booking")}
              className="text-ivory/40 text-xs hover:text-ivory transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleClick("#booking")}
              className="text-ivory/40 text-xs hover:text-ivory transition-colors"
            >
              Terms of Service
            </button>
          </div>
          <p className="text-ivory/30 text-xs flex items-center gap-1">
            Made with <Heart size={10} className="text-champagne" /> in Lagos
          </p>
        </div>
      </div>
    </footer>
  );
}
