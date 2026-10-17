import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { OuzPortrait } from './OuzPortrait';

export interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenPricing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onOpenPricing,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="h-screen w-full flex flex-col justify-between relative overflow-x-clip bg-[#0C0C0C] select-none">
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30">
        <nav
          aria-label="Main Navigation"
          className="flex justify-between items-center w-full px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]"
        >
          <button
            type="button"
            onClick={() => scrollTo('about')}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer whitespace-nowrap"
          >
            About
          </button>
          <button
            type="button"
            onClick={onOpenPricing}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer whitespace-nowrap"
          >
            Price
          </button>
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer whitespace-nowrap"
          >
            Projects
          </button>
          <button
            type="button"
            onClick={onOpenContact}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer whitespace-nowrap"
          >
            Contact
          </button>
        </nav>
      </FadeIn>

      {/* 2. Hero Heading Container */}
      <div className="w-full overflow-hidden text-center z-0 pointer-events-none mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16vw]"
          >
            Hi, I&apos;M OUZ.T
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait (Centered absolutely with Magnet) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[500px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-2 pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full"
          >
            <OuzPortrait />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar */}
      <div className="flex justify-between items-end w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)]"
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
