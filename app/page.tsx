import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <AwardsSection />
      <ContactSection />
    </div>
  );
}
