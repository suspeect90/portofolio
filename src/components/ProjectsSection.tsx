import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';

export interface ProjectData {
  number: string;
  name: string;
  category: 'Client' | 'Personal';
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  description: string;
}

export const PROJECTS: ProjectData[] = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    description:
      '3D procedural spatial identity and bespoke motion brand assets crafted for digital-first studio production.',
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    description:
      'Fluid volumetric material exploration and luminous typographic forms bridging organic and synthetic realities.',
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    description:
      'Futuristic industrial product showcase featuring chromatic refraction, high-poly geometry, and dark mode interface elements.',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onOpenProject: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Target scale calculation: 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const topOffset = index * 28;

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32 w-full max-w-6xl mx-auto"
      style={{
        top: `calc(5rem + ${topOffset}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-[0_30px_70px_rgba(0,0,0,0.9)] will-change-transform"
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#D7E2EA]/15">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-[#D7E2EA] leading-none text-[clamp(2.5rem,6vw,90px)] select-none">
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                {project.category}
              </span>
              <h3 className="font-medium uppercase text-[#D7E2EA] text-[clamp(1.1rem,2.2vw,2rem)] tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton onClick={() => onOpenProject(project)} />
        </div>

        {/* Bottom row: Two-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 pt-4 sm:pt-6">
          {/* Left Column (40% width) - 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-6 justify-between">
            <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141416]">
              <img
                src={project.col1Image1}
                alt={`${project.name} detail preview 1`}
                loading="lazy"
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] hover:scale-105 transition-transform duration-500 h-[clamp(130px,16vw,230px)]"
              />
            </div>
            <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141416]">
              <img
                src={project.col1Image2}
                alt={`${project.name} detail preview 2`}
                loading="lazy"
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] hover:scale-105 transition-transform duration-500 h-[clamp(160px,22vw,340px)]"
              />
            </div>
          </div>

          {/* Right Column (60% width) - 1 tall image */}
          <div className="md:col-span-7 flex flex-col justify-stretch">
            <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141416] h-full min-h-[260px] sm:min-h-[340px] md:min-h-[440px]">
              <img
                src={project.col2Image}
                alt={`${project.name} main presentation`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export interface ProjectsSectionProps {
  onOpenProject: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenProject,
}) => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative pt-20 sm:pt-28 md:pt-36 pb-36 px-4 sm:px-6 md:px-10 overflow-visible"
    >
      {/* Heading: "Project" (singular) */}
      <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-24 md:mb-32">
        <h2 className="hero-heading font-black uppercase text-center leading-none text-[clamp(3rem,12vw,160px)]">
          Project
        </h2>
      </FadeIn>

      {/* 3 Sticky-Stacking Project Cards */}
      <div className="relative flex flex-col gap-12 sm:gap-16 w-full">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
            onOpenProject={onOpenProject}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
