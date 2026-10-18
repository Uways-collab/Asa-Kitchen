"use client";

import { useEffect, useRef } from "react";

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-porcelain/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center reveal">
          <span className="text-xs tracking-[0.3em] uppercase text-sage font-medium">
            Guest Experiences
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl text-forest font-light leading-tight mt-6">
            Words From Our{" "}
            <span className="italic">Guests</span>
          </h2>
          <div className="mt-12 bg-white p-10 lg:p-14 rounded-sm border border-porcelain">
            <svg
              width="40"
              height="30"
              viewBox="0 0 40 30"
              fill="none"
              className="mx-auto mb-6 text-champagne"
            >
              <path
                d="M0 30V18C0 7.5 6.5 2 16 0L17.5 3.5C12 5.5 9 9 8.5 14H16V30H0ZM22 30V18C22 7.5 28.5 2 38 0L39.5 3.5C34 5.5 31 9 30.5 14H38V30H22Z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
            <p className="font-serif text-2xl lg:text-3xl text-forest/80 italic leading-relaxed">
              Every visit to Beauty Endowed is an experience we craft with intention
              and care. Our guests&apos; satisfaction and comfort are at the heart of
              everything we do.
            </p>
            <p className="text-charcoal/50 mt-8 text-sm">
              Testimonials from our guests will be shared here as they become available.
            </p>
          </div>
          <p className="text-charcoal/40 text-xs mt-8 italic">
            We look forward to earning your kind words.
          </p>
        </div>
      </div>
    </section>
  );
}
