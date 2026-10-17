import React, { useState } from 'react';
import { X, ExternalLink, Sparkles, Check, Share2 } from 'lucide-react';
import type { ProjectData } from './ProjectsSection';

export interface ProjectPreviewModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}

export const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const images = [project.col2Image, project.col1Image1, project.col1Image2];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl bg-[#101012] border-2 border-[#D7E2EA]/30 rounded-[32px] sm:rounded-[48px] p-4 sm:p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-h-[94vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2.5 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pr-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-black text-2xl sm:text-3xl text-purple-400">
                {project.number}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                {project.category} Project
              </span>
            </div>
            <h2 className="hero-heading font-black uppercase text-2xl sm:text-4xl tracking-tight">
              {project.name}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-wider text-[#D7E2EA] hover:bg-white/10 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
            <button
              type="button"
              onClick={() => onInquire(project.name)}
              className="rounded-full bg-white text-black px-5 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
            >
              Request Similar
            </button>
          </div>
        </div>

        {/* Featured Large Viewer */}
        <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[55vh] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-neutral-900 mb-4 border border-white/10">
          <img
            src={images[activeImageIndex]}
            alt={`${project.name} inspection view`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnail Selector */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          {images.map((src, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`rounded-2xl overflow-hidden h-20 sm:h-28 border-2 transition-all cursor-pointer ${
                activeImageIndex === idx ? 'border-purple-400 scale-[1.02]' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={src} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Project Details Footer */}
        <div className="bg-[#17171B] rounded-2xl p-5 sm:p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm text-[#D7E2EA]/80 font-light leading-relaxed max-w-2xl">
            {project.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-[#D7E2EA]/60 uppercase tracking-wider whitespace-nowrap">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Octane · C4D · Redshift · WebGL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreviewModal;
