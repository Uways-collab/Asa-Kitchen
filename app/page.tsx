import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import SanctuaryIntro from "@/components/SanctuaryIntro";
import TreatmentShowcase from "@/components/TreatmentShowcase";
import PackageSection from "@/components/PackageSection";
import BookingBuilder from "@/components/BookingBuilder";
import WellnessDiscovery from "@/components/WellnessDiscovery";
import Gallery from "@/components/Gallery";
import FounderSection from "@/components/FounderSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <main>
        <Header />
        <Hero />
        <BrandStory />
        <SanctuaryIntro />
        <TreatmentShowcase />
        <PackageSection />
        <BookingBuilder />
        <WellnessDiscovery />
        <Gallery />
        <FounderSection />
        <Testimonials />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
