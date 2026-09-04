import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/product-grid";
import { SectionReveal } from "@/components/shared/section-reveal";
import { CTABanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse AMIBA's curated catalog of GMP-certified pharmaceuticals, surgical consumables, PPE, and diagnostic devices for institutional buyers.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-10 sm:pt-16 pb-8 sm:pb-12 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center">
              <p className="text-editorial text-signal-teal text-base mb-3">
                Our catalog
              </p>
              <h1 className="text-display-lg text-ink mb-4">Products</h1>
              <p className="text-body-lg text-slate max-w-2xl mx-auto">
                A carefully curated selection of pharmaceutical and medical
                products, each sourced from certified manufacturers with full
                regulatory compliance.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16 sm:pb-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <ProductGrid />
          </Suspense>
        </div>
      </section>

      <CTABanner
        heading="Need a product not listed here?"
        subheading="Our catalog is growing. Contact us with your specific requirements and we'll source it from our verified manufacturer network."
        ctaText="Contact Us"
      />
    </>
  );
}
