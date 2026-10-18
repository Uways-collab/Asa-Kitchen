"use client";

import { useEffect, useRef } from "react";

export default function SanctuaryIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="sanctuary" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1920&q=80&auto=format&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1200&q=80&auto=format&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-espresso/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="reveal">
          <span className="text-champagne/80 text-xs tracking-[0.3em] uppercase">
            Welcome to Beauty Endowed
          </span>
          <h2 className="font-serif text-4xl lg:text-6xl xl:text-7xl text-ivory font-light leading-tight mt-8">
            A Private World of{" "}
            <span className="italic">Beauty,</span>
            <br />
            Crafted for{" "}
            <span className="italic">You.</span>
          </h2>
          <p className="text-ivory/70 text-lg lg:text-xl mt-8 max-w-2xl mx-auto leading-relaxed">
            Nestled in the heart of Ketu, our sanctuary offers an escape from the everyday —
            a place where expert care, serene surroundings, and intentional rituals
            come together to help you feel your most radiant self.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-ivory/50">
            <div className="text-center">
              <p className="font-serif text-3xl text-champagne">4</p>
              <p className="text-xs tracking-widest uppercase mt-1">Treatment Categories</p>
            </div>
            <div className="w-px bg-ivory/10" />
            <div className="text-center">
              <p className="font-serif text-3xl text-champagne">12+</p>
              <p className="text-xs tracking-widest uppercase mt-1">Signature Treatments</p>
            </div>
            <div className="w-px bg-ivory/10" />
            <div className="text-center">
              <p className="font-serif text-3xl text-champagne">4</p>
              <p className="text-xs tracking-widest uppercase mt-1">Curated Packages</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
