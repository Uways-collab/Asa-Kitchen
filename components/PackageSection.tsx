"use client";

import { useEffect, useRef, useState } from "react";
import { Crown, Star, Gem, Diamond } from "lucide-react";

interface Package {
  tier: string;
  name: string;
  price: number;
  includes: string[];
  icon: React.ElementType;
  highlight?: boolean;
  image: string;
}

const packages: Package[] = [
  {
    tier: "THE ESSENTIAL RESET",
    name: "Pamper Me Package",
    price: 60000,
    icon: Star,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80&auto=format&fit=crop",
    includes: [
      "Brightening Facial",
      "Full Body Exfoliation",
      "Swedish Relaxation Massage",
      "Mini Pedicure",
    ],
  },
  {
    tier: "THE DEEP RESTORATION",
    name: "Glow & Relax Package",
    price: 75000,
    icon: Gem,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6f?w=800&q=80&auto=format&fit=crop",
    includes: [
      "Deep Detox Facial",
      "Body Scrub with Steam Therapy",
      "Therapeutic Swedish Massage",
      "Full Spa Pedicure",
    ],
  },
  {
    tier: "THE SIGNATURE INDULGENCE",
    name: "Luxury Queen Package",
    price: 100000,
    icon: Crown,
    highlight: true,
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80&auto=format&fit=crop",
    includes: [
      "Premium Customized Facial",
      "Full Body Silk Polish",
      "Hot Stone Thermal Therapy",
      "Luxury Spa Pedicure",
      "Chilled Wine or Refreshment, subject to availability",
    ],
  },
  {
    tier: "THE ULTIMATE ESCAPE",
    name: "Ultimate Spa Day",
    price: 140000,
    icon: Diamond,
    image: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80&auto=format&fit=crop",
    includes: [
      "Advanced Aesthetics Facial",
      "Moroccan Hammam Bath",
      "Full Body Exfoliation Scrub",
      "Deep Tissue Muscle Therapy",
      "Luxury Pedicure & Treat Box",
    ],
  },
];

export default function PackageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);

  return (
    <section ref={sectionRef} id="packages" className="py-24 lg:py-32 bg-forest relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-champagne blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-sage blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 reveal">
          <span className="text-xs tracking-[0.3em] uppercase text-champagne/80 font-medium">
            Signature Packages
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-ivory font-light leading-tight mt-6">
            Complete Rituals,{" "}
            <span className="italic">Unforgettable</span> Experiences
          </h2>
          <p className="text-ivory/60 mt-6 text-lg leading-relaxed">
            Our curated packages combine our most coveted treatments into transformative
            experiences designed for total renewal.
          </p>
        </div>

        {/* Desktop: editorial layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {/* Featured / highlighted package */}
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`reveal relative group rounded-sm overflow-hidden ${
                pkg.highlight ? "lg:col-span-2" : ""
              }`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className={`flex ${pkg.highlight ? "min-h-[500px]" : "min-h-[380px]"}`}>
                {/* Image */}
                <div className={`relative overflow-hidden ${pkg.highlight ? "w-1/2" : "w-2/5"}`}>
                  <img
                    src={pkg.image}
                    alt={`${pkg.name} at Beauty Endowed`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-espresso/30" />
                </div>

                {/* Content */}
                <div className={`flex flex-col justify-center ${pkg.highlight ? "w-1/2 p-12 lg:p-16" : "w-3/5 p-8 lg:p-10"} bg-espresso/40 backdrop-blur-sm`}>
                  {pkg.highlight && (
                    <span className="text-champagne text-xs tracking-[0.3em] uppercase mb-4">
                      The Signature Experience
                    </span>
                  )}
                  <span className="text-ivory/50 text-xs tracking-[0.2em] uppercase">
                    {pkg.tier}
                  </span>
                  <h3 className={`font-serif text-ivory font-light mt-3 ${pkg.highlight ? "text-4xl" : "text-3xl"}`}>
                    {pkg.name}
                  </h3>
                  <p className="font-serif text-champagne text-3xl mt-4">
                    {formatPrice(pkg.price)}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-ivory/70 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      const el = document.querySelector("#booking");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`mt-8 btn-primary text-xs ${pkg.highlight ? "!bg-champagne !text-espresso hover:!bg-ivory" : ""}`}
                  >
                    {pkg.highlight ? "Claim Your Queen Experience" : `Book ${pkg.name}`}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="lg:hidden horizontal-scroll -mx-6 px-6 gap-4">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`w-[85vw] flex-shrink-0 rounded-sm overflow-hidden ${
                pkg.highlight ? "border border-champagne/30" : ""
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={`${pkg.name} at Beauty Endowed`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
                {pkg.highlight && (
                  <div className="absolute top-4 left-4 bg-champagne text-espresso px-3 py-1 text-xs tracking-widest uppercase">
                    Signature
                  </div>
                )}
              </div>
              <div className="p-6 bg-espresso/40 backdrop-blur-sm">
                <span className="text-ivory/50 text-xs tracking-[0.2em] uppercase">
                  {pkg.tier}
                </span>
                <h3 className="font-serif text-ivory text-2xl font-light mt-2">
                  {pkg.name}
                </h3>
                <p className="font-serif text-champagne text-2xl mt-2">
                  {formatPrice(pkg.price)}
                </p>
                <ul className="mt-4 space-y-2">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-ivory/60 text-sm">
                      <span className="w-1 h-1 rounded-full bg-champagne mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    const el = document.querySelector("#booking");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-6 btn-primary text-xs w-full justify-center"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
