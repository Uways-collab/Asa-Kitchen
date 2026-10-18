"use client";

import { useEffect, useRef } from "react";

export default function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="expertise" className="py-24 lg:py-32 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          {/* Image - takes 2 cols */}
          <div className="lg:col-span-2 reveal-left">
            <div className="relative">
              <div className="img-zoom aspect-[3/4] rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85&auto=format&fit=crop&crop=face"
                  alt="Afolabi Afolashade Shobowale, Founder and Certified Beauty Therapist at Beauty Endowed"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-champagne/30 rounded-sm -z-10" />
            </div>
          </div>

          {/* Text - takes 3 cols */}
          <div className="lg:col-span-3 reveal-right">
            <span className="text-xs tracking-[0.3em] uppercase text-sage font-medium">
              Meet the Founder
            </span>

            <h2 className="font-serif text-4xl lg:text-5xl text-forest font-light leading-tight mt-6 mb-8">
              Care That Begins With{" "}
              <span className="italic">Understanding</span> You.
            </h2>

            <div className="space-y-6 text-charcoal/80 leading-relaxed">
              <p className="text-lg">
                Every meaningful beauty experience begins with listening. At Beauty
                Endowed, our approach centers on understanding your preferences,
                discussing your goals, and helping you select an experience that feels
                right for you.
              </p>
              <p>
                Afolabi Afolashade Shobowale founded Beauty Endowed with a singular
                vision: to create a space in Ketu where the art of self-care is treated
                with the intention and expertise it deserves. As a certified beauty
                therapist, every treatment is delivered with attentiveness, precision,
                and genuine care.
              </p>
              <p>
                Whether you are seeking a moment of calm, a skin experience tailored to
                your needs, or a full day of restorative indulgence, you will find a
                sanctuary that was designed with you in mind.
              </p>
            </div>

            {/* Founder info */}
            <div className="mt-10 pt-8 border-t border-porcelain">
              <p className="font-serif text-2xl text-forest italic">
                Afolabi Afolashade Shobowale
              </p>
              <p className="text-xs tracking-widest uppercase text-sage mt-2">
                Founder & Certified Beauty Therapist
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary text-xs"
              >
                Request a Consultation
              </button>
              <a
                href="https://wa.me/2348034415260?text=Hello%2C%20I%27d%20like%20to%20book%20a%20consultation%20at%20Beauty%20Endowed."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
