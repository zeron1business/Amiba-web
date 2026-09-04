"use client";

import { useState } from "react";
import { certifications } from "@/data/certifications";
import { SectionReveal, SectionRevealChild } from "@/components/shared/section-reveal";
import { CTABanner } from "@/components/shared/cta-banner";
import {
  Shield,
  Globe,
  Award,
  FileCheck,
  Stethoscope,
  BadgeCheck,
  Snowflake,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Shield,
  Globe,
  Award,
  FileCheck,
  Stethoscope,
  BadgeCheck,
  Snowflake,
};

export default function QualityPage() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const selected = certifications.find((c) => c.abbreviation === selectedCert);

  return (
    <>
      {/* Hero */}
      <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-3xl">
              <p className="text-editorial text-signal-teal text-base mb-3">
                Quality & compliance
              </p>
              <h1 className="text-display-lg text-ink mb-6">
                Certifications that
                <br />
                <span className="text-signal-teal">earn your confidence</span>
              </h1>
              <p className="text-body-lg text-slate">
                Every product in the AMIBA catalog meets rigorous quality standards.
                Our supply chain is certified, our processes are documented, and our
                commitment to compliance is non-negotiable.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="pb-16 sm:pb-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => {
                const Icon = iconMap[cert.icon] || Shield;
                return (
                  <SectionRevealChild key={cert.abbreviation}>
                    <button
                      onClick={() => setSelectedCert(cert.abbreviation)}
                      className="glass-card p-6 sm:p-8 w-full text-left group hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-signal-teal/10 flex items-center justify-center mb-5 group-hover:bg-signal-teal/20 transition-colors">
                        <Icon size={28} className="text-signal-teal" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-display-md !text-lg text-ink mb-2">
                        {cert.abbreviation}
                      </h3>
                      <p className="text-sm font-medium text-slate mb-3">
                        {cert.name}
                      </p>
                      <p className="text-body-sm text-slate line-clamp-2">
                        {cert.description}
                      </p>
                      <span className="inline-block mt-4 text-xs font-medium text-signal-teal">
                        Learn more →
                      </span>
                    </button>
                  </SectionRevealChild>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Compliance Statement */}
      <section className="py-14 sm:py-20 bg-clinical-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular opacity-15" />
        <div className="grain-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="text-display-lg text-white mb-6">
              Our compliance commitment
            </h2>
            <p className="text-body-lg text-white/70 mb-8">
              AMIBA operates in full compliance with the Drugs and Cosmetics Act, 1940,
              and the rules thereunder. We maintain valid wholesale drug licenses, GST
              registration, and all regulatory permits required for the storage,
              distribution, and sale of pharmaceutical products and medical devices in
              India.
            </p>
            <p className="text-body text-white/50">
              Our quality management system encompasses vendor qualification, incoming
              material inspection, storage environment control, dispatch verification,
              and post-market surveillance — ensuring that every product reaching our
              partners meets the highest standards of safety, efficacy, and regulatory
              compliance.
            </p>
          </SectionReveal>
        </div>
      </section>


      <CTABanner
        heading="Questions about our quality standards?"
        subheading="Our quality assurance team is available to discuss certifications, provide documentation, or arrange a facility review."
      />

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/60 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card max-w-lg w-full p-6 sm:p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 text-slate hover:text-ink transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <div className="w-14 h-14 rounded-2xl bg-signal-teal/10 flex items-center justify-center mb-5">
                {(() => {
                  const Icon = iconMap[selected.icon] || Shield;
                  return <Icon size={28} className="text-signal-teal" strokeWidth={1.5} />;
                })()}
              </div>
              <h3 className="text-display-md text-ink mb-1">
                {selected.abbreviation}
              </h3>
              <p className="text-sm font-medium text-signal-teal mb-4">
                {selected.name}
              </p>
              <p className="text-body text-slate leading-relaxed">
                {selected.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
