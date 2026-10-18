"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X, RotateCcw, Send, Calendar, Clock } from "lucide-react";

interface Treatment {
  id: string;
  name: string;
  price: number;
  duration?: number; // minutes
  category: string;
  description: string;
}

const allTreatments: Treatment[] = [
  // Massage
  { id: "m1", name: "Swedish Massage", price: 30000, duration: 60, category: "Massage Therapies", description: "Classic relaxation massage" },
  { id: "m2", name: "Deep Tissue Massage", price: 35000, duration: 60, category: "Massage Therapies", description: "Targeted deep pressure therapy" },
  { id: "m3", name: "Hot Stone Therapy", price: 40000, duration: 75, category: "Massage Therapies", description: "Warm stone relaxation" },
  { id: "m4", name: "Aromatherapy Massage", price: 32000, duration: 60, category: "Massage Therapies", description: "Essential oil massage" },
  // Facials
  { id: "f1", name: "Brightening Facial", price: 25000, category: "Facials & Aesthetics", description: "Luminosity-boosting treatment" },
  { id: "f2", name: "Deep Detox Facial", price: 28000, category: "Facials & Aesthetics", description: "Deep cleansing facial" },
  { id: "f3", name: "Hydro-Dermabrasion", price: 38000, category: "Facials & Aesthetics", description: "Advanced exfoliation" },
  { id: "f4", name: "Skin Tag Removal", price: 20000, category: "Facials & Aesthetics", description: "Professional assessment required" },
  // Body
  { id: "b1", name: "Moroccan Hammam Bath", price: 45000, duration: 90, category: "Baths & Body Care", description: "Traditional hammam ritual" },
  { id: "b2", name: "Full Body Scrub", price: 22000, duration: 45, category: "Baths & Body Care", description: "Invigorating exfoliation" },
  // Hands & Feet
  { id: "h1", name: "Luxury Spa Pedicure", price: 18000, duration: 60, category: "Hands & Feet", description: "Indulgent pedicure" },
  { id: "h2", name: "Express Mani-Pedi", price: 20000, duration: 45, category: "Hands & Feet", description: "Refined mani and pedicure" },
];

const categories = ["Massage Therapies", "Facials & Aesthetics", "Baths & Body Care", "Hands & Feet"];

export default function BookingBuilder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

  const toggleTreatment = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const resetSelection = () => setSelected([]);

  const selectedTreatments = allTreatments.filter((t) => selected.includes(t.id));
  const total = selectedTreatments.reduce((sum, t) => sum + t.price, 0);
  const knownDurations = selectedTreatments.filter((t) => t.duration);
  const totalDuration = knownDurations.reduce((sum, t) => sum + (t.duration || 0), 0);
  const hasUnspecifiedDuration = selectedTreatments.some((t) => !t.duration);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.phone.trim()) errors.phone = "WhatsApp number is required";
    if (!formData.date) errors.date = "Preferred date is required";
    if (!formData.time) errors.time = "Preferred time is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitBooking = () => {
    if (!validateForm()) return;

    const treatmentList = selectedTreatments.map((t) => t.name).join(", ");
    const durationText = totalDuration > 0
      ? `Approx. ${totalDuration} minutes${hasUnspecifiedDuration ? " (some durations unspecified)" : ""}`
      : "Duration to be confirmed";

    const message = `*New Booking Request — Beauty Endowed*

*Client Details:*
• Name: ${formData.name}
• WhatsApp: ${formData.phone}
${formData.email ? `• Email: ${formData.email}` : ""}
• Preferred Date: ${formData.date}
• Preferred Time: ${formData.time}

*Selected Treatments:*
${selectedTreatments.map((t) => `• ${t.name} — ${formatPrice(t.price)}${t.duration ? ` (${t.duration} min)` : ""}`).join("\n")}

*Estimated Total:* ${formatPrice(total)}
*Estimated Duration:* ${durationText}

${formData.notes ? `*Special Requests:* ${formData.notes}` : ""}

Please confirm availability. I understand this is a reservation request, not a confirmed booking.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348034415260?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section ref={sectionRef} id="booking" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="text-xs tracking-[0.3em] uppercase text-sage font-medium">
            Bespoke Booking
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-forest font-light leading-tight mt-6">
            Your Time. Your Treatments.{" "}
            <span className="italic">Your Ritual.</span>
          </h2>
          <p className="text-charcoal/70 mt-6 text-lg leading-relaxed">
            Create an experience that feels entirely your own. Select the treatments
            you desire and receive an estimated total before requesting your reservation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Treatment selection */}
          <div className="lg:col-span-2 space-y-8">
            {categories.map((cat) => (
              <div key={cat} className="reveal">
                <h3 className="font-serif text-2xl text-forest mb-4">{cat}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {allTreatments
                    .filter((t) => t.category === cat)
                    .map((t) => {
                      const isSelected = selected.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          onClick={() => toggleTreatment(t.id)}
                          className={`treatment-card text-left p-4 rounded-sm border transition-all duration-300 ${
                            isSelected
                              ? "bg-forest border-forest text-ivory"
                              : "bg-white border-porcelain hover:border-sage"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                    isSelected ? "border-champagne bg-champagne" : "border-sage"
                                  }`}
                                >
                                  {isSelected && <Check size={12} className="text-forest" />}
                                </div>
                                <span className="font-medium text-sm">{t.name}</span>
                              </div>
                              <p className={`text-xs mt-1 ml-7 ${isSelected ? "text-ivory/70" : "text-charcoal/50"}`}>
                                {t.description}
                                {t.duration && ` · ${t.duration} min`}
                              </p>
                            </div>
                            <span className={`font-serif text-sm ${isSelected ? "text-champagne" : "text-forest"}`}>
                              {formatPrice(t.price)}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}

            {selected.length > 0 && (
              <button
                onClick={resetSelection}
                className="flex items-center gap-2 text-sm text-sage hover:text-forest transition-colors"
              >
                <RotateCcw size={14} />
                Reset Selection
              </button>
            )}
          </div>

          {/* Booking summary */}
          <div className="reveal lg:sticky lg:top-28 self-start">
            <div className="bg-forest rounded-sm p-8 text-ivory">
              <h3 className="font-serif text-2xl font-light mb-6">
                Your Booking Summary
              </h3>

              {selected.length === 0 ? (
                <p className="text-ivory/50 text-sm">
                  Select treatments from the left to build your personalized experience.
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {selectedTreatments.map((t) => (
                      <div key={t.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="truncate">{t.name}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <span className="text-champagne text-xs">{formatPrice(t.price)}</span>
                          <button
                            onClick={() => toggleTreatment(t.id)}
                            className="text-ivory/40 hover:text-ivory transition-colors"
                            aria-label={`Remove ${t.name}`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-ivory/10 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-ivory/60">Treatments</span>
                      <span>{selected.length} selected</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-ivory/60 flex items-center gap-1">
                        <Clock size={12} /> Duration
                      </span>
                      <span>
                        {totalDuration > 0 ? `${totalDuration} min` : "—"}
                        {hasUnspecifiedDuration && (
                          <span className="text-ivory/40 text-xs block">
                            + unspecified
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-ivory/60 text-sm">Total Investment</span>
                      <span className="font-serif text-2xl text-champagne number-transition">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-6 w-full btn-primary justify-center !bg-champagne !text-espresso hover:!bg-ivory"
                  >
                    Request Your Bespoke Booking
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Booking form modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/80 backdrop-blur-sm">
            <div className="bg-ivory rounded-sm max-w-lg w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-forest">Complete Your Reservation</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-charcoal/50 hover:text-charcoal"
                  aria-label="Close form"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-sage mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-sm bg-white text-charcoal focus:outline-none focus:border-forest transition-colors ${
                      formErrors.name ? "border-red-400" : "border-porcelain"
                    }`}
                    placeholder="Your full name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1" role="alert">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-sage mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-sm bg-white text-charcoal focus:outline-none focus:border-forest transition-colors ${
                      formErrors.phone ? "border-red-400" : "border-porcelain"
                    }`}
                    placeholder="0803 441 5260"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-xs mt-1" role="alert">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-sage mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-porcelain rounded-sm bg-white text-charcoal focus:outline-none focus:border-forest transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-sage mb-2">
                      <Calendar size={12} className="inline mr-1" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-sm bg-white text-charcoal focus:outline-none focus:border-forest transition-colors ${
                        formErrors.date ? "border-red-400" : "border-porcelain"
                      }`}
                    />
                    {formErrors.date && (
                      <p className="text-red-500 text-xs mt-1" role="alert">{formErrors.date}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-sage mb-2">
                      <Clock size={12} className="inline mr-1" />
                      Preferred Time *
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-sm bg-white text-charcoal focus:outline-none focus:border-forest transition-colors ${
                        formErrors.time ? "border-red-400" : "border-porcelain"
                      }`}
                    />
                    {formErrors.time && (
                      <p className="text-red-500 text-xs mt-1" role="alert">{formErrors.time}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-sage mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-porcelain rounded-sm bg-white text-charcoal focus:outline-none focus:border-forest transition-colors resize-none"
                    placeholder="Any preferences or special requirements..."
                  />
                </div>

                <div className="bg-porcelain/50 p-4 rounded-sm">
                  <p className="text-xs text-charcoal/60">
                    <strong>Selected treatments:</strong>{" "}
                    {selectedTreatments.map((t) => t.name).join(", ")}
                  </p>
                  <p className="text-sm text-forest font-serif mt-2">
                    Estimated total: {formatPrice(total)}
                  </p>
                </div>

                <p className="text-xs text-charcoal/50">
                  Your information is handled with care and used only for booking purposes.
                  This is a reservation request, not a confirmed appointment. We will
                  contact you to confirm availability.
                </p>

                <button
                  onClick={submitBooking}
                  className="w-full btn-primary justify-center"
                >
                  <Send size={16} />
                  Send via WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
