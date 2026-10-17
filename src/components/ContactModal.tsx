import React, { useState } from 'react';
import { X, Check, Copy, Send, Sparkles } from 'lucide-react';
import { ContactButton } from './ContactButton';

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  prefilledService,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: prefilledService || '3D Modeling',
    timeline: '1-3 Weeks',
    budget: '$5,000 - $10,000',
    message: '',
  });

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ouzt@studio-3d.creator');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-[#121214] border-2 border-[#D7E2EA]/30 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="hero-heading font-black uppercase text-3xl sm:text-4xl mb-3">
              Transmission Received
            </h3>
            <p className="text-[#D7E2EA]/80 font-light text-base max-w-sm mb-8">
              Thanks for reaching out, {form.name || 'friend'}. OUZ.T will review your project brief and reply within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="rounded-full border border-[#D7E2EA] px-8 py-3 text-sm uppercase tracking-widest text-[#D7E2EA] hover:bg-white/10 transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-purple-400 font-medium mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Available for Q2/Q3 Projects</span>
            </div>
            <h2 className="hero-heading font-black uppercase text-3xl sm:text-4xl leading-tight mb-2">
              Start a Project
            </h2>
            <p className="text-[#D7E2EA]/70 text-sm font-light mb-6">
              Share details about your upcoming 3D render, branding, or animation concept.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Alex Vance"
                    className="w-full bg-[#1A1A1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-[#1A1A1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                    Service Required
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-[#1A1A1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
                  >
                    <option value="3D Modeling">3D Modeling</option>
                    <option value="Rendering">Rendering & Shading</option>
                    <option value="Motion Design">Motion Design & Keyframing</option>
                    <option value="Branding">Visual Branding & System</option>
                    <option value="Web Design">Web Design & Interactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                    Estimated Budget
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-[#1A1A1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm"
                  >
                    <option value="< $3,000">&lt; $3,000</option>
                    <option value="$3,000 - $6,000">$3,000 - $6,000</option>
                    <option value="$6,000 - $12,000">$6,000 - $12,000</option>
                    <option value="$12,000+">$12,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                  Project Vision & Scope
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the story, timeline, deliverables, or aesthetic references..."
                  className="w-full bg-[#1A1A1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 text-sm resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D7E2EA]/70 hover:text-white transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Email Copied!' : 'ouzt@studio-3d.creator'}</span>
                </button>

                <ContactButton
                  label="Send Request"
                  className="px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
