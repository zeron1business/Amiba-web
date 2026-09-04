"use client";

import { useState } from "react";
import { faqData } from "@/data/faq";
import { SectionReveal } from "@/components/shared/section-reveal";
import { CTABanner } from "@/components/shared/cta-banner";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <>
      <section className="pt-10 sm:pt-16 pb-16 sm:pb-24 bg-paper">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-editorial text-signal-teal text-base mb-3">
                FAQ
              </p>
              <h1 className="text-display-lg text-ink mb-4">
                Frequently asked questions
              </h1>
              <p className="text-body-lg text-slate">
                Common questions about ordering, verification, logistics, and
                compliance.
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-12">
            {faqData.map((category) => (
              <SectionReveal key={category.category}>
                <div>
                  <h2 className="text-display-md !text-xl text-ink mb-6 pb-3 border-b border-mist">
                    {category.category}
                  </h2>
                  <div className="space-y-2">
                    {category.items.map((item, i) => {
                      const key = `${category.category}-${i}`;
                      const isOpen = openItems.has(key);

                      return (
                        <div
                          key={key}
                          className="border border-mist rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(key)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-mist/20 transition-colors"
                            aria-expanded={isOpen}
                          >
                            <span className="text-body font-medium text-ink pr-4">
                              {item.question}
                            </span>
                            <ChevronDown
                              size={20}
                              className={`text-slate flex-shrink-0 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <p className="px-5 pb-5 text-body-sm text-slate leading-relaxed">
                                  {item.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Still have questions?"
        subheading="Our team is here to help. Reach out and we'll get back to you within 24 hours."
        ctaText="Contact Us"
      />
    </>
  );
}
