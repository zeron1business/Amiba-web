import type { Metadata } from "next";
import Image from "next/image";
import { SectionReveal, SectionRevealChild } from "@/components/shared/section-reveal";
import { CTABanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = {
  title: "Board of Directors",
  description:
    "Meet the Board of Directors of AMIBA Pharmaceuticals, including our founders and next-generation leadership.",
};

export default function BoardOfDirectorsPage() {
  return (
    <>
      <section className="pt-10 sm:pt-16 pb-16 sm:pb-20 bg-paper min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow w-full">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-editorial text-signal-teal text-base mb-3">Leadership</p>
              <h1 className="text-display-lg text-ink">Board of Directors</h1>
            </div>
          </SectionReveal>

          {/* Founders */}
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-display-md text-ink">Founders</h2>
            </div>
          </SectionReveal>
          
          <SectionReveal stagger>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24 mb-24">
              <SectionRevealChild>
                <div className="text-center">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-4 bg-mist flex items-center justify-center">
                    <Image
                      src="/images/founders/tapash-mandal.jpg"
                      alt="Tapash Kr Mandal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-xl text-ink">Tapash Kr Mandal</h3>
                  <p className="text-signal-teal text-base font-medium mt-1">Founder</p>
                </div>
              </SectionRevealChild>
              
              <SectionRevealChild>
                <div className="text-center">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-4 bg-mist flex items-center justify-center">
                    <Image
                      src="/images/founders/manash-mandal.jpg"
                      alt="Manash Kr Mandal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-xl text-ink">Manash Kr Mandal</h3>
                  <p className="text-signal-teal text-base font-medium mt-1">Founder</p>
                </div>
              </SectionRevealChild>
            </div>
          </SectionReveal>

          {/* Directors */}
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-display-md text-ink">The Next Generation</h2>
            </div>
          </SectionReveal>
          
          <SectionReveal stagger>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24 mb-12">
              <SectionRevealChild>
                <div className="text-center">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-4 bg-mist flex items-center justify-center">
                    <Image
                      src="/images/founders/mriganka-mandal.jpg"
                      alt="Mriganka Mandal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-xl text-ink">Mriganka Mandal</h3>
                  <p className="text-signal-teal text-base font-medium mt-1">Director (B.D)</p>
                </div>
              </SectionRevealChild>
              
              <SectionRevealChild>
                <div className="text-center">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-4 bg-gradient-to-br from-signal-teal/20 to-mist flex items-center justify-center">
                    <span className="text-5xl font-bold text-signal-teal font-[var(--font-display)]">
                      MM
                    </span>
                  </div>
                  <h3 className="font-semibold text-xl text-ink">Mrinmoy Mandal</h3>
                  <p className="text-signal-teal text-base font-medium mt-1">Director (B.O)</p>
                </div>
              </SectionRevealChild>
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
