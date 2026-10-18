export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Beauty Endowed",
    description:
      "A private beauty and wellness sanctuary in Ketu, Lagos offering personalized skincare, restorative massage, hammam-inspired bathing rituals, and thoughtful self-care experiences.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "45, Demurin Road, Opposite Herbinco Pharmacy",
      addressLocality: "Ketu, Lagos",
      addressCountry: "NG",
    },
    telephone: "+2348034415260",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "12:00",
        closes: "18:00",
      },
    ],
    priceRange: "₦₦",
    founder: {
      "@type": "Person",
      name: "Afolabi Afolashade Shobowale",
      jobTitle: "CEO & Certified Beauty Therapist",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
