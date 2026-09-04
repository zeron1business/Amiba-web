import type { Metadata } from "next";
import { SectionReveal, SectionRevealChild } from "@/components/shared/section-reveal";
import { CTABanner } from "@/components/shared/cta-banner";
import {
  MessageSquare,
  FileCheck,
  Package,
  HeadphonesIcon,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "For Partners",
  description:
    "Learn how AMIBA's B2B ordering works — from verification and onboarding to ordering, logistics, and dedicated account support.",
};

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Enquire",
    description:
      "Submit a quote request or contact our sales team. Tell us about your institution, the products you need, and your estimated volumes.",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "Verify",
    description:
      "Provide your Drug License (Form 20/21), GST Registration, and business authorization. We verify your credentials within 2–3 working days.",
  },
  {
    icon: Package,
    step: "03",
    title: "Quote & Order",
    description:
      "Receive institutional pricing tailored to your volume. Place orders through your dedicated account manager or our B2B ordering platform.",
  },
  {
    icon: HeadphonesIcon,
    step: "04",
    title: "Delivery & Support",
    description:
      "Receive documented, temperature-controlled deliveries with batch traceability. Ongoing support from your dedicated account manager.",
  },
];

const tiers = [
  {
    tier: "Standard",
    minOrder: "As per product MOQ",
    pricing: "List institutional pricing",
    support: "Shared account support",
    deliveryPriority: "Standard (3–7 days)",
  },
  {
    tier: "Volume",
    minOrder: "2× product MOQ",
    pricing: "Volume-discounted pricing",
    support: "Dedicated account manager",
    deliveryPriority: "Priority (2–5 days)",
  },
  {
    tier: "Strategic",
    minOrder: "Custom contract",
    pricing: "Custom contract pricing",
    support: "Senior account manager + QA liaison",
    deliveryPriority: "Express + scheduled deliveries",
  },
];

const checklist = [
  "Valid Drug License (Form 20 or Form 21)",
  "GST Registration Certificate",
  "PAN Card of the business entity",
  "Purchase Authorization Letter on company letterhead",
  "Delivery address(es) with cold-chain capability if ordering biologics",
];

export default function ForPartnersPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-3xl">
              <p className="text-editorial text-signal-teal text-base mb-3">
                For partners
              </p>
              <h1 className="text-display-lg text-ink mb-6">
                How working with
                <br />
                <span className="text-signal-teal">AMIBA works</span>
              </h1>
              <p className="text-body-lg text-slate">
                From enquiry to ongoing supply — here&apos;s what institutional
                buyers can expect when partnering with AMIBA.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-14 sm:py-20 bg-mist/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="text-display-lg text-ink">How it works</h2>
            </div>
          </SectionReveal>

          <SectionReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {steps.map((s, i) => (
                <SectionRevealChild key={s.step}>
                  <div className="relative">
                    {/* Connector line */}
                    {i < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-mist z-0" />
                    )}
                    <div className="glass-card p-6 sm:p-8 relative z-10 h-full">
                      <div className="w-12 h-12 rounded-xl bg-signal-teal/10 flex items-center justify-center mb-5">
                        <s.icon size={24} className="text-signal-teal" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-bold text-signal-teal uppercase tracking-wider">
                        Step {s.step}
                      </span>
                      <h3 className="text-display-md !text-lg text-ink mt-2 mb-3">
                        {s.title}
                      </h3>
                      <p className="text-body-sm text-slate">{s.description}</p>
                    </div>
                  </div>
                </SectionRevealChild>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-14 sm:py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-editorial text-signal-teal text-base mb-3">
                Partnership tiers
              </p>
              <h2 className="text-display-lg text-ink">
                Pricing that scales with you
              </h2>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-mist">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-ink">
                      Feature
                    </th>
                    {tiers.map((t) => (
                      <th
                        key={t.tier}
                        className={`text-left py-4 px-6 text-sm font-semibold ${
                          t.tier === "Volume"
                            ? "text-signal-teal"
                            : "text-ink"
                        }`}
                      >
                        {t.tier}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Minimum Order", key: "minOrder" as const },
                    { label: "Pricing", key: "pricing" as const },
                    { label: "Account Support", key: "support" as const },
                    { label: "Delivery", key: "deliveryPriority" as const },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-mist">
                      <td className="py-4 px-6 text-sm font-medium text-ink">
                        {row.label}
                      </td>
                      {tiers.map((t) => (
                        <td
                          key={`${t.tier}-${row.key}`}
                          className="py-4 px-6 text-sm text-slate"
                        >
                          {t[row.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Coverage Map Placeholder */}
      <section className="py-14 sm:py-20 bg-clinical-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular opacity-15" />
        <div className="grain-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-editorial text-signal-teal text-base mb-3">
                Our reach
              </p>
              <h2 className="text-display-lg text-white">Pan-India coverage</h2>
              <p className="text-body text-white/60 mt-4 max-w-2xl mx-auto">
                AMIBA delivers to healthcare institutions across all 28 states
                and 8 union territories, with dedicated logistics hubs in major
                metro regions.
              </p>
            </div>

            {/* Stylized coverage stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: "28", label: "States" },
                { value: "8", label: "Union Territories" },
                { value: "50+", label: "Cities" },
                { value: "500+", label: "Delivery Points" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-signal-teal font-[var(--font-display)] mb-1">
                    {stat.value}
                  </div>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Onboarding Checklist */}
      <section className="py-14 sm:py-20 bg-paper">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-editorial text-signal-teal text-base mb-3">
                Get started
              </p>
              <h2 className="text-display-lg text-ink">Onboarding checklist</h2>
              <p className="text-body text-slate mt-4">
                Have these documents ready to expedite your account setup.
              </p>
            </div>

            <div className="glass-card p-6 sm:p-8">
              <ul className="space-y-4">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-signal-teal mt-0.5 flex-shrink-0"
                    />
                    <span className="text-body text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </section>

      <CTABanner
        heading="Ready to become an AMIBA partner?"
        subheading="Submit your details and our team will guide you through the onboarding process."
      />
    </>
  );
}
