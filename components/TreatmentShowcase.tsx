"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";

interface Treatment {
  name: string;
  price: number;
  duration?: string;
  description: string;
}

interface TreatmentCategory {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  treatments: Treatment[];
  cta: string;
}

const categories: TreatmentCategory[] = [
  {
    title: "Restorative Massage",
    subtitle: "Release. Restore. Renew.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db872?w=800&q=80&auto=format&fit=crop",
    description:
      "Release everyday tension through thoughtfully selected massage experiences designed to encourage relaxation and physical comfort.",
    treatments: [
      { name: "Swedish Massage", price: 30000, duration: "60 min", description: "Classic relaxation massage to ease tension and promote calm." },
      { name: "Deep Tissue Massage", price: 35000, duration: "60 min", description: "Targeted deep pressure to release chronic muscle tension." },
      { name: "Hot Stone Therapy", price: 40000, duration: "75 min", description: "Warm basalt stones melt away stress and ease sore muscles." },
      { name: "Aromatherapy Massage", price: 32000, duration: "60 min", description: "Essential oil-infused massage for deep sensory relaxation." },
    ],
    cta: "Explore Massage Rituals",
  },
  {
    title: "Facials & Skin Experiences",
    subtitle: "Reveal Your Natural Radiance",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80&auto=format&fit=crop",
    description:
      "Discover personalized facial treatments tailored to your skincare preferences, with a focus on cleansing, exfoliation, hydration, and a refreshed-looking complexion.",
    treatments: [
      { name: "Brightening Facial", price: 25000, description: "A luminosity-boosting facial for a more radiant appearance." },
      { name: "Deep Detox Facial", price: 28000, description: "Deep cleansing facial to purify and refresh the complexion." },
      { name: "Hydro-Dermabrasion", price: 38000, description: "Advanced exfoliation for smoother, more even-toned skin." },
      { name: "Skin Tag Removal", price: 20000, description: "Professional assessment and removal by a certified therapist. Consultation required to determine suitability." },
    ],
    cta: "Discover Facial Treatments",
  },
  {
    title: "Body Rituals & Hammam",
    subtitle: "Purify. Smooth. Restore.",
    image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80&auto=format&fit=crop",
    description:
      "Experience the restorative pleasure of body exfoliation, warm steam, and traditional hammam-inspired rituals in a serene environment.",
    treatments: [
      { name: "Moroccan Hammam Bath", price: 45000, description: "Traditional steam bath and exfoliation ritual inspired by Moroccan hammam traditions." },
      { name: "Full Body Scrub", price: 22000, description: "Invigorating full-body exfoliation for silky-smooth skin." },
    ],
    cta: "Explore Body Rituals",
  },
  {
    title: "Hands & Feet",
    subtitle: "Thoughtful Finishing Touches",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80&auto=format&fit=crop",
    description:
      "Thoughtful finishing touches, from essential nail care to indulgent pedicure experiences.",
    treatments: [
      { name: "Luxury Spa Pedicure", price: 18000, description: "An indulgent pedicure with exfoliation, massage, and polish." },
      { name: "Express Mani-Pedi", price: 20000, description: "A refined manicure and pedicure for polished hands and feet." },
    ],
    cta: "Discover Nail Care",
  },
];

export default function TreatmentShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedCat, setExpandedCat] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right, .stagger-children");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);

  return (
    <section ref={sectionRef} id="treatments" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 reveal">
          <span className="text-xs tracking-[0.3em] uppercase text-sage font-medium">
            Signature Treatments
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-forest font-light leading-tight mt-6">
            Curated Experiences for{" "}
            <span className="italic">Every Ritual</span>
          </h2>
          <p className="text-charcoal/70 mt-6 text-lg leading-relaxed">
            From restorative massage to luminous facials, each treatment is designed to nurture
            your body and renew your spirit.
          </p>
        </div>

        {/* Treatment categories */}
        <div className="space-y-16 lg:space-y-24">
          {categories.map((cat, catIdx) => (
            <div
              key={catIdx}
              className={`reveal grid lg:grid-cols-2 gap-8 lg:gap-16 items-start ${
                catIdx % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <div className={`${catIdx % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="img-zoom aspect-[4/3] rounded-sm overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={`${cat.title} treatment at Beauty Endowed`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="text-ivory/80 text-xs tracking-[0.2em] uppercase">
                      {cat.subtitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${catIdx % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="font-serif text-3xl lg:text-4xl text-forest font-light">
                  {cat.title}
                </h3>
                <p className="text-charcoal/70 mt-4 leading-relaxed">
                  {cat.description}
                </p>

                {/* Treatments list */}
                <div className="mt-8 space-y-0 divide-y divide-porcelain">
                  {cat.treatments.map((t, tIdx) => (
                    <div
                      key={tIdx}
                      className="py-4 group cursor-pointer"
                      onClick={() =>
                        setExpandedCat(expandedCat === catIdx * 10 + tIdx ? null : catIdx * 10 + tIdx)
                      }
                    >
                      <div className="flex items-baseline justify-between">
                        <h4 className="font-medium text-forest group-hover:text-sage transition-colors">
                          {t.name}
                        </h4>
                        <div className="flex items-center gap-3">
                          {t.duration && (
                            <span className="text-xs text-sage flex items-center gap-1">
                              <Clock size={12} />
                              {t.duration}
                            </span>
                          )}
                          <span className="font-serif text-lg text-forest">
                            {formatPrice(t.price)}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          expandedCat === catIdx * 10 + tIdx ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm text-charcoal/60">{t.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const el = document.querySelector("#booking");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-8 inline-flex items-center gap-2 text-sm text-forest font-medium tracking-wide uppercase hover:gap-3 transition-all"
                >
                  {cat.cta}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
