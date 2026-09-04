import type { Metadata } from "next";
import Image from "next/image";
import { SectionReveal } from "@/components/shared/section-reveal";
import { CTABanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = {
  title: "Founders Note",
  description:
    "A message from the founders of AMIBA Pharmaceuticals, Tapash Kr Mandal and Manash Kr Mandal.",
};

export default function FoundersNotePage() {
  return (
    <>
      <section className="pt-10 sm:pt-16 pb-16 sm:pb-20 bg-mist/30 min-h-screen flex flex-col">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-editorial text-signal-teal text-base mb-3">Founders&apos; note</p>
              <h1 className="text-display-lg text-ink">A Message from the Founders</h1>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate/5 relative overflow-hidden mb-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-signal-teal/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              {/* Founder Profiles */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-12 relative z-10">
                <div className="text-center">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-4 bg-mist flex items-center justify-center">
                    <Image
                      src="/images/founders/tapash-mandal.jpg"
                      alt="Tapash Kr Mandal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-ink">Tapash Kr Mandal</h3>
                  <p className="text-signal-teal text-sm font-medium">Founder</p>
                </div>
                
                <div className="text-center">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-4 bg-mist flex items-center justify-center">
                    <Image
                      src="/images/founders/manash-mandal.jpg"
                      alt="Manash Kr Mandal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-ink">Manash Kr Mandal</h3>
                  <p className="text-signal-teal text-sm font-medium">Founder</p>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-6 text-slate text-lg leading-relaxed relative z-10">
                <p className="font-medium text-ink text-xl">Every great journey begins with a small step.</p>
                
                <p>
                  More than 35 years ago, our journey in healthcare began with hard work, determination, and a simple desire to build something meaningful.
                </p>
                
                <p>
                  One of us started his career as a Medical Representative — travelling, meeting doctors, learning the business from the ground up, facing challenges, and slowly building relationships and trust. There were no shortcuts. Every achievement came through years of dedication, persistence, and the courage to keep moving forward.
                </p>
                
                <p>
                  While one of us was constantly on the road, focused on developing the business and building its foundation, the other stood firmly behind it as the financial and operational backbone of the family and the business. Together, through different responsibilities and countless sacrifices, we built our journey step by step.
                </p>
                
                <p>
                  Today, after more than three decades in healthcare, seeing AMIBA PHARMACEUTICALS become a reality is one of the proudest moments of our lives.
                </p>
                
                <p>
                  But AMIBA is not the end of our journey. It is the beginning of a new one.
                </p>
                
                <p>
                  Our sons, Mriganka and Mrinmoy, have taken this dream forward and transformed it into a new-generation pharmaceutical venture. What we spent decades learning, they now have the opportunity to build upon — with new ideas, new energy, and a new vision.
                </p>
                
                <p>
                  And to everyone who dreams of building a career with AMIBA PHARMACEUTICALS, we want to say one thing:
                </p>
                
                <blockquote className="border-l-4 border-signal-teal pl-6 py-2 my-8 italic font-medium text-ink text-xl bg-signal-teal/5 rounded-r-lg">
                  &quot;Do not be afraid to start small.&quot;
                </blockquote>
                
                <p>
                  A career does not become successful overnight. Start with sincerity. Learn every day. Respect your work. Build relationships. Accept failures. Stay consistent. And never underestimate what years of honest hard work can achieve.
                </p>
                
                <p>
                  One of us began as a Medical Representative. Today, we are founders of a pharmaceutical company.
                </p>
                
                <p className="font-medium text-ink">
                  Your starting point does not decide your destination. Your dedication does.
                </p>
                
                <p>
                  We want AMIBA to be more than a workplace. We want it to be a place where young professionals can learn, grow, take responsibility, dream bigger, and build something they can be proud of.
                </p>
                
                <p className="font-medium text-ink">
                  Our dream has come true.
                </p>
                
                <p className="font-medium text-ink mb-12">
                  Now, we want to build the future together with you.
                </p>
                
                <div className="pt-8 border-t border-slate/10">
                  <p className="text-base text-slate mb-6">With gratitude, pride, and hope for the journey ahead,</p>
                  
                  <div className="font-[var(--font-display)]">
                    <p className="text-2xl font-bold text-ink mb-1">— Tapash Kr Mandal & Manash Kr Mandal</p>
                    <p className="text-signal-teal font-medium uppercase tracking-widest text-sm mb-6">AMIBA PHARMACEUTICALS</p>
                  </div>
                  
                  <p className="text-sm font-medium text-slate uppercase tracking-wider">
                    35+ years of experience. <span className="text-signal-teal">•</span> One new generation. <span className="text-signal-teal">•</span> One shared vision. <span className="text-signal-teal">•</span> A future built together.
                  </p>
                </div>
              </div>
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
