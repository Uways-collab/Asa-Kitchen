"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Moon, Crown, Droplets } from "lucide-react";

const options = [
  {
    id: "radiant",
    icon: Sparkles,
    text: "I want my skin to look refreshed and radiant.",
    recommendations: [
      { name: "Brightening Facial", price: 25000, description: "A luminosity-boosting facial for a more radiant appearance." },
      { name: "Deep Detox Facial", price: 28000, description: "Deep cleansing to purify and refresh the complexion." },
      { name: "Hydro-Dermabrasion", price: 38000, description: "Advanced exfoliation for smoother, more even-toned skin." },
      { name: "Glow & Relax Package", price: 75000, description: "Detox facial, body scrub, massage, and spa pedicure." },
    ],
  },
  {
    id: "unwind",
    icon: Moon,
    text: "I need to unwind and ease everyday tension.",
    recommendations: [
      { name: "Swedish Massage", price: 30000, description: "Classic relaxation massage to ease tension." },
      { name: "Hot Stone Therapy", price: 40000, description: "Warm stones melt away stress and ease sore muscles." },
      { name: "Aromatherapy Massage", price: 32000, description: "Essential oil-infused massage for sensory relaxation." },
      { name: "Pamper Me Package", price: 60000, description: "Facial, exfoliation, massage, and mini pedicure." },
    ],
  },
  {
    id: "pamper",
    icon: Crown,
    text: "I want a complete head-to-toe pampering experience.",
    recommendations: [
      { name: "Luxury Queen Package", price: 100000, description: "Customized facial, silk polish, hot stone, pedicure." },
      { name: "Ultimate Spa Day", price: 140000, description: "Full day: aesthetics facial, hammam, deep tissue, pedicure." },
      { name: "Glow & Relax Package", price: 75000, description: "Complete restoration with facial, scrub, massage, and pedicure." },
    ],
  },
  {
    id: "hammam",
    icon: Droplets,
    text: "I would love to explore our hammam and body rituals.",
    recommendations: [
      { name: "Moroccan Hammam Bath", price: 45000, description: "Traditional steam bath and exfoliation ritual." },
      { name: "Full Body Scrub", price: 22000, description: "Invigorating full-body exfoliation for silky-smooth skin." },
      { name: "Ultimate Spa Day", price: 140000, description: "Includes Moroccan Hammam, facial, deep tissue, and more." },
    ],
  },
];

export default function WellnessDiscovery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeOption, setActiveOption] = useState<string | null>(null);

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

  const activeRecs = options.find((o) => o.id === activeOption);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-porcelain/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="text-xs tracking-[0.3em] uppercase text-sage font-medium">
            Wellness Discovery
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-forest font-light leading-tight mt-6">
            What Would You Like to{" "}
            <span className="italic">Feel</span> Today?
          </h2>
          <p className="text-charcoal/70 mt-6 text-lg">
            Let us guide you to the perfect experience. Choose what resonates with you.
          </p>
        </div>

        {/* Options grid */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12 reveal">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveOption(activeOption === opt.id ? null : opt.id)}
              className={`text-left p-6 rounded-sm border transition-all duration-400 group ${
                activeOption === opt.id
                  ? "bg-forest border-forest text-ivory"
                  : "bg-white border-porcelain hover:border-sage hover:bg-cream"
              }`}
            >
              <div className="flex items-start gap-4">
                <opt.icon
                  size={24}
                  className={`mt-0.5 transition-colors ${
                    activeOption === opt.id ? "text-champagne" : "text-sage group-hover:text-forest"
                  }`}
                />
                <p className={`text-sm leading-relaxed ${
                  activeOption === opt.id ? "text-ivory/90" : "text-charcoal/70"
                }`}>
                  {opt.text}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Recommendations */}
        {activeRecs && (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="bg-white rounded-sm p-8 lg:p-10 border border-porcelain">
              <h3 className="font-serif text-2xl text-forest mb-6">
                We Recommend for You
              </h3>
              <div className="space-y-4">
                {activeRecs.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between py-4 border-b border-porcelain last:border-0"
                  >
                    <div>
                      <h4 className="font-medium text-forest">{rec.name}</h4>
                      <p className="text-sm text-charcoal/60 mt-1">{rec.description}</p>
                    </div>
                    <span className="font-serif text-lg text-forest ml-4 flex-shrink-0">
                      {formatPrice(rec.price)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    const el = document.querySelector("#booking");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-primary text-xs"
                >
                  Book These Treatments
                </button>
                <a
                  href={`https://wa.me/2348034415260?text=${encodeURIComponent("Hello, I'd like to learn more about your treatments at Beauty Endowed.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
