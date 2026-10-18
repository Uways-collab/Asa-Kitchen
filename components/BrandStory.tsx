"use client";

import { useEffect, useRef } from "react";

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="reveal-left relative">
            <div className="relative">
              <div className="img-zoom aspect-[4/5] rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbec6f?w=800&q=80&auto=format&fit=crop"
                  alt="Serene spa treatment environment with warm natural light and botanical elements"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative offset element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-champagne/20 rounded-sm hidden lg:block" />
              <div className="absolute -top-4 -left-4 w-20 h-20 border border-sage/30 rounded-sm hidden lg:block" />
            </div>
          </div>

          {/* Text side */}
          <div className="reveal-right">
            <span className="text-xs tracking-[0.3em] uppercase text-sage font-medium">
              The Beauty Endowed Philosophy
            </span>

            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-forest font-light leading-tight mt-6 mb-8">
              A Sanctuary Where
              <br />
              <span className="italic">Beauty</span> Meets{" "}
              <span className="italic">Wellbeing.</span>
            </h2>

            <div className="space-y-6 text-charcoal/80 leading-relaxed">
              <p className="text-base lg:text-lg">
                At Beauty Endowed, we believe self-care deserves more than a moment
                squeezed into a busy day. It deserves intention, expertise, and an
                environment where you can truly unwind.
              </p>
              <p className="text-base lg:text-lg">
                Founded and directed by Afolabi Afolashade Shobowale, our sanctuary
                brings together personalized skincare, restorative body therapies,
                and thoughtful beauty rituals to create experiences that leave you
                feeling cared for, refreshed, and renewed.
              </p>
              <p className="text-base lg:text-lg">
                Every visit is an invitation to slow down, reconnect with yourself,
                and make space for your wellbeing.
              </p>
            </div>

            {/* Founder signature */}
            <div className="mt-10 pt-8 border-t border-porcelain">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop&crop=face"
                    alt="Afolabi Afolashade Shobowale, Founder of Beauty Endowed"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-serif text-lg text-forest italic">
                    Afolabi Afolashade Shobowale
                  </p>
                  <p className="text-xs tracking-widest uppercase text-sage mt-1">
                    Founder & Certified Beauty Therapist
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => {
                  const el = document.querySelector("#expertise");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-secondary"
              >
                Discover Our Philosophy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
