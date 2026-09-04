import type { Metadata } from "next";
import { SectionReveal, SectionRevealChild } from "@/components/shared/section-reveal";
import { CTABanner } from "@/components/shared/cta-banner";
import { Target, Eye, Heart, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Journey",
  description:
    "Learn about AMIBA's mission to transform B2B pharmaceutical supply in India — our story, values, and commitment to quality healthcare access.",
};

const values = [
  { icon: Target, title: "Precision", description: "Every product batch-tested. Every shipment documented. Every claim verifiable." },
  { icon: Eye, title: "Transparency", description: "Clear pricing, complete traceability, and honest communication at every touchpoint." },
  { icon: Heart, title: "Care", description: "Behind every order is a patient. We never compromise on quality or cut corners on compliance." },
  { icon: Users, title: "Partnership", description: "We don't just sell — we build long-term supply relationships that make your operations easier." },
];

export default function OurJourneyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-10 sm:pt-16 pb-16 sm:pb-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-3xl">
              <p className="text-editorial text-signal-teal text-base mb-3">Our story</p>
              <h1 className="text-display-lg text-ink mb-6">
                Building trust in every
                <br />
                <span className="text-signal-teal">shipment we deliver</span>
              </h1>
              <p className="text-body-lg text-slate">
                AMIBA was born from a simple observation: institutional buyers in India
                deserve a pharmaceutical supply partner that prioritizes transparency,
                quality documentation, and reliable logistics as much as competitive
                pricing. We set out to build that partner.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-14 sm:py-20 bg-mist/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <SectionRevealChild>
                <div className="glass-card p-6 sm:p-10 h-full">
                  <p className="text-editorial text-signal-teal text-sm mb-3">Mission</p>
                  <h2 className="text-display-md text-ink mb-4">
                    Making quality medicine accessible at institutional scale
                  </h2>
                  <p className="text-body text-slate">
                    We bridge the gap between GMP-certified manufacturers and healthcare
                    institutions by providing a supply chain that is transparent,
                    documented, and built for the rigour that pharmaceutical procurement
                    demands.
                  </p>
                </div>
              </SectionRevealChild>
              <SectionRevealChild>
                <div className="glass-card p-6 sm:p-10 h-full">
                  <p className="text-editorial text-signal-teal text-sm mb-3">Vision</p>
                  <h2 className="text-display-md text-ink mb-4">
                    The most trusted name in B2B pharma supply
                  </h2>
                  <p className="text-body text-slate">
                    We envision a future where every hospital, pharmacy, and clinic in
                    India has access to a reliable, quality-assured supply partner — where
                    procurement is effortless and product integrity is never in question.
                  </p>
                </div>
              </SectionRevealChild>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-editorial text-signal-teal text-base mb-3">Our values</p>
              <h2 className="text-display-lg text-ink">What drives us</h2>
            </div>
          </SectionReveal>
          <SectionReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v) => (
                <SectionRevealChild key={v.title}>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-signal-teal/10 flex items-center justify-center mx-auto mb-4">
                      <v.icon size={28} className="text-signal-teal" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-display-md !text-lg text-ink mb-2">{v.title}</h3>
                    <p className="text-body-sm text-slate">{v.description}</p>
                  </div>
                </SectionRevealChild>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Our Journey Narrative */}
      <section className="py-14 sm:py-20 bg-clinical-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular opacity-15" />
        <div className="grain-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-editorial text-signal-teal text-base mb-3">Our journey</p>
              <h2 className="text-display-lg text-white">A Legacy of Trust</h2>
            </div>
            
            <div className="space-y-6 text-white/80 text-lg leading-relaxed text-center sm:text-left">
              <p>
                Every meaningful journey begins with a dream—and for us, that dream has been built over decades of dedication, trust, and service.
              </p>
              <p>
                For the past 38 years, our family has been privileged to serve the community through a renowned pharmaceutical retail store and a trusted diagnostic centre. What began as a humble endeavour gradually grew through the unwavering commitment of our family, the faith of our customers, and the relationships we built along the way.
              </p>
              <p>
                These years have taught us that healthcare is not simply a business. It is a responsibility—one that demands integrity, compassion, quality, and a commitment to putting people first.
              </p>
              <p>
                Today, Amiba Pharmaceuticals represents the next chapter of that journey. It is one of our family's biggest dreams—a dream shaped by 38 years of experience, hard work, and a deep understanding of the healthcare community we serve.
              </p>
              <p>
                With Amiba, we aspire to take our family's legacy forward by contributing to the pharmaceutical industry with the same values that have guided us from the beginning: trust, quality, responsibility, and service.
              </p>
              <p>
                We know that this is not the destination, but the beginning of a new journey. And as we move forward, we remain humble and grateful for everyone who has been a part of our story.
              </p>
              
              <div className="pt-8 mt-8 border-t border-white/10 text-xl font-medium text-white text-center">
                <p>38 years of experience.</p>
                <p className="text-signal-teal my-2">One enduring commitment.</p>
                <p>A new dream—Amiba Pharmaceuticals.</p>
              </div>
              
              <p className="pt-6 text-signal-teal font-semibold text-2xl font-[var(--font-display)] text-center">
                Our journey continues.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <CTABanner
        heading="Join the AMIBA partner network"
        subheading="Discover what reliable, transparent pharmaceutical supply looks like."
      />
    </>
  );
}
