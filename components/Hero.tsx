"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, Leaf, Shield, Heart, Sparkles } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      const img = el.querySelector(".hero-img") as HTMLElement;
      if (img) {
        img.style.transform = `translateY(${scrolled * 0.15}px) scale(1.05)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="hero-img absolute inset-0 scale-105 transition-transform duration-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=85&auto=format&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 via-espresso/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-espresso/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-32 lg:py-0">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            <span className="text-champagne/90 text-xs tracking-[0.3em] uppercase font-sans">
              Ketu, Lagos · A Private Wellness Sanctuary
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-ivory font-light leading-[1.1] mt-6 mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            Your Ritual of
            <br />
            <span className="italic font-normal">Beauty.</span>
            <br />
            Your Moment of
            <br />
            <span className="italic font-normal">Stillness.</span>
          </h1>

          {/* Body */}
          <p
            className="text-ivory/80 text-base lg:text-lg leading-relaxed max-w-lg font-light animate-fade-in-up"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            Discover a more intentional approach to self-care at Beauty Endowed.
            Experience restorative massage therapies, personalized skincare rituals,
            and luxurious body treatments in a sanctuary designed around your natural radiance.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mt-10 animate-fade-in-up"
            style={{ animationDelay: "0.8s", animationFillMode: "both" }}
          >
            <button
              onClick={() => handleScroll("#booking")}
              className="btn-primary"
            >
              Reserve Your Experience
            </button>
            <button
              onClick={() => handleScroll("#packages")}
              className="btn-secondary border-ivory/40 text-ivory hover:bg-ivory hover:text-forest"
            >
              Explore Our Rituals
            </button>
          </div>
        </div>
      </div>

      {/* Credibility strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-ivory/10 backdrop-blur-sm border-t border-ivory/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { icon: Sparkles, text: "Personalized wellness experiences" },
              { icon: Shield, text: "Certified beauty therapist" },
              { icon: Heart, text: "Private treatment environment" },
              { icon: Leaf, text: "Thoughtfully curated formulations" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon size={16} className="text-champagne flex-shrink-0" />
                <span className="text-ivory/70 text-xs lg:text-sm tracking-wide">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-28 lg:bottom-24 right-8 z-10 hidden lg:flex flex-col items-center gap-2">
        <span className="text-ivory/50 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="text-ivory/50 animate-scroll-indicator" />
      </div>
    </section>
  );
}
