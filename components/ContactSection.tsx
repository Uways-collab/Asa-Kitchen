"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Clock, Send, ExternalLink } from "lucide-react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    treatment: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    if (!formData.date) e.date = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = `*Appointment Enquiry — Beauty Endowed*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
${formData.email ? `*Email:* ${formData.email}` : ""}
*Preferred Date:* ${formData.date}
${formData.time ? `*Preferred Time:* ${formData.time}` : ""}
${formData.treatment ? `*Treatment Interest:* ${formData.treatment}` : ""}
${formData.notes ? `*Notes:* ${formData.notes}` : ""}

I would like to enquire about booking an appointment.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/2348034415260?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="text-xs tracking-[0.3em] uppercase text-sage font-medium">
            Visit Us
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-forest font-light leading-tight mt-6">
            Your Sanctuary{" "}
            <span className="italic">Awaits.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info side */}
          <div className="reveal-left space-y-10">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-forest" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-forest uppercase tracking-wider">
                  Our Address
                </h3>
                <p className="text-charcoal/70 mt-1">
                  45, Demurin Road, Opposite Herbinco Pharmacy,
                  <br />
                  Ketu, Lagos, Nigeria
                </p>
                <a
                  href="https://www.google.com/maps/search/45+Demurin+Road+Ketu+Lagos+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-forest mt-2 hover:underline"
                >
                  Get Directions <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-forest" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-forest uppercase tracking-wider">
                  Call Us
                </h3>
                <a
                  href="tel:08034415260"
                  className="text-charcoal/70 hover:text-forest transition-colors mt-1 block"
                >
                  0803 441 5260
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-forest" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-forest uppercase tracking-wider">
                  Opening Hours
                </h3>
                <div className="text-charcoal/70 mt-1 space-y-1">
                  <p>Monday – Saturday: 9:00 AM – 7:00 PM</p>
                  <p>Sunday: 12:00 PM – 6:00 PM (appointments only)</p>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-sm overflow-hidden border border-porcelain h-64">
              <iframe
                title="Beauty Endowed location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.1!2d3.3792!3d6.6018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDYuNSJOIDPCsDIyJzQ1LjEiRQ!5e0!3m2!1sen!2sng!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/2348034415260?text=Hello%2C%20I%27d%20like%20to%20make%20a%20booking%20at%20Beauty%20Endowed."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 btn-primary"
            >
              <Send size={16} />
              Book via WhatsApp
            </a>
          </div>

          {/* Form side */}
          <div className="reveal-right">
            <div className="bg-forest rounded-sm p-8 lg:p-10">
              <h3 className="font-serif text-2xl text-ivory font-light mb-6">
                Request an Appointment
              </h3>

              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-champagne font-serif text-xl">Thank you!</p>
                  <p className="text-ivory/70 mt-2 text-sm">
                    Your enquiry has been sent via WhatsApp. We will respond shortly to confirm your appointment.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-ivory/50 text-xs mt-4 underline"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-ivory/60 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 bg-ivory/5 border rounded-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne transition-colors ${
                        errors.name ? "border-red-400" : "border-ivory/10"
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-300 text-xs mt-1" role="alert">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase text-ivory/60 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 bg-ivory/5 border rounded-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne transition-colors ${
                        errors.phone ? "border-red-400" : "border-ivory/10"
                      }`}
                      placeholder="0803 441 5260"
                    />
                    {errors.phone && <p className="text-red-300 text-xs mt-1" role="alert">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase text-ivory/60 mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-ivory/5 border border-ivory/10 rounded-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-ivory/60 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full px-4 py-3 bg-ivory/5 border rounded-sm text-ivory focus:outline-none focus:border-champagne transition-colors ${
                          errors.date ? "border-red-400" : "border-ivory/10"
                        }`}
                      />
                      {errors.date && <p className="text-red-300 text-xs mt-1" role="alert">{errors.date}</p>}
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-ivory/60 mb-2">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 bg-ivory/5 border border-ivory/10 rounded-sm text-ivory focus:outline-none focus:border-champagne transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase text-ivory/60 mb-2">
                      Treatment Interest
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-4 py-3 bg-ivory/5 border border-ivory/10 rounded-sm text-ivory focus:outline-none focus:border-champagne transition-colors"
                    >
                      <option value="" className="bg-forest">Select a treatment</option>
                      <option value="Massage" className="bg-forest">Massage Therapy</option>
                      <option value="Facial" className="bg-forest">Facial Treatment</option>
                      <option value="Body Ritual" className="bg-forest">Body Ritual / Hammam</option>
                      <option value="Pedicure" className="bg-forest">Pedicure / Nail Care</option>
                      <option value="Package" className="bg-forest">Package / Full Day</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase text-ivory/60 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-ivory/5 border border-ivory/10 rounded-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne transition-colors resize-none"
                      placeholder="Any preferences or notes..."
                    />
                  </div>

                  <p className="text-ivory/40 text-xs">
                    Your information is handled with care. This is a reservation request;
                    we will confirm your appointment via WhatsApp or phone.
                  </p>

                  <button
                    type="submit"
                    className="w-full btn-primary justify-center !bg-champagne !text-espresso hover:!bg-ivory"
                  >
                    <Send size={16} />
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
