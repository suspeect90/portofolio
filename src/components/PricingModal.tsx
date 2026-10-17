import React from 'react';
import { X, Check } from 'lucide-react';
import { ContactButton } from './ContactButton';

export interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tierName: string) => void;
}

interface Tier {
  name: string;
  price: string;
  period: string;
  description: string;
  deliverables: string[];
  popular?: boolean;
}

const TIERS: Tier[] = [
  {
    name: '3D Asset & Key Shot',
    price: '$3,200',
    period: 'Per project',
    description: 'Bespoke hero 3D modeling, photorealistic procedural textures, and 3 cinematic camera angles.',
    deliverables: [
      'High-poly + low-poly FBX/GLTF model',
      '4K Octane / Cycles render passes',
      'Alpha transparent background cutouts',
      '2 rounds of lighting revisions',
    ],
  },
  {
    name: 'Motion & Render Suite',
    price: '$6,500',
    period: 'Most Popular',
    description: 'Dynamic brand animation, particle choreography, and social cutdowns for product launches.',
    deliverables: [
      '15-30s 4K 60fps 3D hero motion loop',
      'Sound design & spatial audio sync',
      '9:16 and 16:9 export variations',
      'Editable source project files & materials',
    ],
    popular: true,
  },
  {
    name: 'Spatial Brand Identity',
    price: '$12,000',
    period: 'Full Scope',
    description: 'Complete 3D visual system, procedural logo reveal, UI asset kit, and interactive web export.',
    deliverables: [
      'Full 3D typography & monogram suite',
      'Complete WebGL-ready asset pipeline',
      'Interactive 3D landing page hero',
      'Dedicated Slack channel & sprint delivery',
    ],
  },
];

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSelectTier,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-[#121214] border-2 border-[#D7E2EA]/30 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-medium">
            Pricing & Engagement Models
          </span>
          <h2 className="hero-heading font-black uppercase text-3xl sm:text-5xl mt-1 mb-2">
            Investment
          </h2>
          <p className="text-[#D7E2EA]/70 text-sm sm:text-base font-light max-w-lg mx-auto">
            Transparent pricing for high-impact 3D commissions, kinetic art, and brand worlds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-[28px] p-6 flex flex-col justify-between border transition-all ${
                tier.popular
                  ? 'border-purple-400 bg-gradient-to-b from-[#1C1628] to-[#121214] shadow-[0_0_35px_rgba(182,0,168,0.2)]'
                  : 'border-white/10 bg-[#17171B]'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium uppercase tracking-tight text-white">
                    {tier.name}
                  </h3>
                  {tier.popular && (
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                      Popular
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-black text-white">{tier.price}</span>
                  <span className="text-xs text-[#D7E2EA]/60 uppercase tracking-wider">
                    / {tier.period}
                  </span>
                </div>

                <p className="text-xs text-[#D7E2EA]/70 font-light mb-6 leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-2.5 mb-8">
                  {tier.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#D7E2EA]/85">
                      <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <ContactButton
                label="Select Scope"
                onClick={() => onSelectTier(tier.name)}
                className="w-full text-center justify-center px-4 py-3 text-xs"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
