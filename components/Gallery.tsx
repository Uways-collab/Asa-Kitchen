"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  caption: string;
  span?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80&auto=format&fit=crop",
    alt: "Luxury spa treatment room with warm lighting",
    category: "Treatment Suites",
    caption: "Our serene treatment sanctuary",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db872?w=800&q=80&auto=format&fit=crop",
    alt: "Massage therapy session in progress",
    category: "Massage & Relaxation",
    caption: "Restorative massage therapy",
  },
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80&auto=format&fit=crop",
    alt: "Facial treatment with premium skincare products",
    category: "Facials & Skincare",
    caption: "Personalized facial experience",
  },
  {
    src: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80&auto=format&fit=crop",
    alt: "Hammam steam ritual setup",
    category: "Hammam Rituals",
    caption: "Traditional hammam ritual",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80&auto=format&fit=crop",
    alt: "Skincare products arranged beautifully",
    category: "Facials & Skincare",
    caption: "Thoughtfully curated products",
  },
  {
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80&auto=format&fit=crop",
    alt: "Luxury pedicure setup",
    category: "Pedicure & Nail Care",
    caption: "Luxury pedicure experience",
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbec6f?w=800&q=80&auto=format&fit=crop",
    alt: "Spa environment with botanical elements",
    category: "Treatment Suites",
    caption: "Botanical tranquility",
  },
  {
    src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80&auto=format&fit=crop",
    alt: "Relaxing spa atmosphere with candles",
    category: "Massage & Relaxation",
    caption: "Evening relaxation rituals",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80&auto=format&fit=crop",
    alt: "Premium spa treatment setup",
    category: "All Experiences",
    caption: "The complete spa experience",
  },
  {
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80&auto=format&fit=crop",
    alt: "Warm towels and spa amenities",
    category: "Treatment Suites",
    caption: "Every detail considered",
  },
  {
    src: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80&auto=format&fit=crop",
    alt: "Spa relaxation area",
    category: "All Experiences",
    caption: "Your moment of stillness",
  },
  {
    src: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80&auto=format&fit=crop",
    alt: "Skincare application close-up",
    category: "Facials & Skincare",
    caption: "Skincare precision",
  },
];

const categories = [
  "All Experiences",
  "Treatment Suites",
  "Hammam Rituals",
  "Facials & Skincare",
  "Massage & Relaxation",
  "Pedicure & Nail Care",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All Experiences");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

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

  const filtered =
    activeCategory === "All Experiences"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);

  const nextImage = useCallback(() => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % filtered.length);
  }, [lightboxIdx, filtered.length]);

  const prevImage = useCallback(() => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + filtered.length) % filtered.length);
  }, [lightboxIdx, filtered.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, nextImage, prevImage]);

  return (
    <section ref={sectionRef} id="gallery" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal">
          <span className="text-xs tracking-[0.3em] uppercase text-sage font-medium">
            The Gallery
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-forest font-light leading-tight mt-6">
            Step Inside Your{" "}
            <span className="italic">Sanctuary.</span>
          </h2>
          <p className="text-charcoal/70 mt-6 text-lg">
            Discover the spaces, treatments, and thoughtful details that make every
            Beauty Endowed experience special.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs tracking-wider uppercase transition-all rounded-sm ${
                activeCategory === cat
                  ? "bg-forest text-ivory"
                  : "bg-white text-charcoal/60 hover:text-forest border border-porcelain"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {filtered.map((img, idx) => (
            <button
              key={`${img.src}-${idx}`}
              onClick={() => openLightbox(idx)}
              className={`img-zoom relative overflow-hidden rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 ${
                img.span === "tall" ? "row-span-2" : ""
              }`}
              style={{ minHeight: img.span === "tall" ? "300px" : "200px" }}
              aria-label={`View ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover absolute inset-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-espresso/0 hover:bg-espresso/30 transition-all duration-300 flex items-end">
                <div className="p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-ivory text-sm font-medium">{img.caption}</p>
                  <p className="text-ivory/60 text-xs mt-1">{img.category}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIdx !== null && (
          <div
            className="fixed inset-0 z-50 bg-espresso/95 lightbox-overlay flex items-center justify-center animate-fade-in"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-ivory/70 hover:text-ivory z-10"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 lg:left-8 text-ivory/70 hover:text-ivory z-10 p-2"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="max-w-4xl max-h-[80vh] mx-12" onClick={(e) => e.stopPropagation()}>
              <img
                src={filtered[lightboxIdx].src.replace("w=800", "w=1400")}
                alt={filtered[lightboxIdx].alt}
                className="max-w-full max-h-[75vh] object-contain"
              />
              <div className="text-center mt-4">
                <p className="text-ivory font-serif text-lg">{filtered[lightboxIdx].caption}</p>
                <p className="text-ivory/50 text-sm mt-1">{filtered[lightboxIdx].category}</p>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 lg:right-8 text-ivory/70 hover:text-ivory z-10 p-2"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
