import { useState } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection, { ProjectData } from './components/ProjectsSection';
import ContactModal from './components/ContactModal';
import PricingModal from './components/PricingModal';
import ProjectPreviewModal from './components/ProjectPreviewModal';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [prefilledService, setPrefilledService] = useState<string | undefined>();

  const handleOpenContact = (service?: string) => {
    setPrefilledService(service);
    setIsContactOpen(true);
  };

  const handleSelectTier = (tierName: string) => {
    setIsPricingOpen(false);
    handleOpenContact(`Pricing Tier: ${tierName}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-['Kanit',sans-serif] selection:bg-purple-600 selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. HeroSection */}
      <HeroSection
        onOpenContact={() => handleOpenContact()}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      {/* 2. MarqueeSection */}
      <MarqueeSection />

      {/* 3. AboutSection */}
      <AboutSection onOpenContact={() => handleOpenContact()} />

      {/* 4. ServicesSection */}
      <ServicesSection />

      {/* 5. ProjectsSection */}
      <ProjectsSection onOpenProject={(proj) => setActiveProject(proj)} />

      {/* Quiet Footer */}
      <footer className="bg-[#0C0C0C] border-t border-[#D7E2EA]/10 px-6 md:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#D7E2EA]/50 uppercase tracking-widest relative z-20">
        <div>
          <span>© {new Date().getFullYear()} OUZ.T · 3D Creator</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Twitter / X
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://artstation.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            ArtStation
          </a>
          <a
            href="https://behance.net"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Behance
          </a>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </footer>

      {/* Modals for Functional Interaction */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        prefilledService={prefilledService}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onSelectTier={handleSelectTier}
      />

      <ProjectPreviewModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onInquire={(projectName) => {
          setActiveProject(null);
          handleOpenContact(`Inquiry regarding ${projectName}`);
        }}
      />
    </div>
  );
}
