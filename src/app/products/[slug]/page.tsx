import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import { ProductCard } from "@/components/products/product-card";
import { SectionReveal } from "@/components/shared/section-reveal";
import { ImageSlider } from "@/components/shared/image-slider";
import {
  Shield,
  Package,
  ArrowLeft,
  FileText,
  Thermometer,
  Clock,
  Layers,
  BoxesIcon,
} from "lucide-react";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = `${product.name} — ${product.composition.split(" ").slice(0, 6).join(" ")} | AMIBA Pharmaceuticals`;
  const description = `${product.shortDescription} ${product.composition}. Pack size: ${product.packSize}. ${product.certifications.join(", ")} certified. Available for B2B wholesale from AMIBA Healthcare India.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    keywords: [
      product.name,
      product.category,
      ...product.composition.split("+").map((c) => c.trim()),
      "B2B pharma India",
      "wholesale pharmaceutical",
      "AMIBA Healthcare",
      ...product.certifications,
    ],
    openGraph: {
      title,
      description: product.shortDescription,
      type: "website",
      url: `/products/${product.slug}`,
      images: product.image
        ? [
            {
              url: product.image,
              width: 800,
              height: 800,
              alt: `${product.name} — ${product.composition}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | AMIBA`,
      description: product.shortDescription,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-display-lg text-ink">Product not found</h1>
        <Link href="/products" className="text-signal-teal mt-4 inline-block">
          ← Back to products
        </Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);

  const productImages = product.variants
    ? product.variants.map(
        (v) => `https://www.amibapharmaceuticals.com${v.image}`
      )
    : product.image
      ? [`https://www.amibapharmaceuticals.com${product.image}`]
      : [];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription,
    image: productImages,
    url: `https://www.amibapharmaceuticals.com/products/${product.slug}`,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "AMIBA Healthcare",
    },
    manufacturer: {
      "@type": "Organization",
      name: "AMIBA Healthcare",
      url: "https://www.amibapharmaceuticals.com",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      seller: {
        "@type": "Organization",
        name: "AMIBA Healthcare",
      },
      eligibleRegion: {
        "@type": "Place",
        name: "India",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Composition",
        value: product.composition,
      },
      {
        "@type": "PropertyValue",
        name: "Pack Size",
        value: product.packSize,
      },
      {
        "@type": "PropertyValue",
        name: "Certifications",
        value: product.certifications.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Storage Conditions",
        value: product.storageConditions,
      },
      {
        "@type": "PropertyValue",
        name: "Shelf Life",
        value: product.shelfLife,
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.amibapharmaceuticals.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://www.amibapharmaceuticals.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://www.amibapharmaceuticals.com/products/${product.slug}`,
      },
    ],
  };

  const specs = [
    { icon: FileText, label: "Composition", value: product.composition },
    { icon: Layers, label: "Pack Size", value: product.packSize },
    { icon: BoxesIcon, label: "Minimum Order Qty", value: product.moq },
    {
      icon: Thermometer,
      label: "Storage Conditions",
      value: product.storageConditions,
    },
    { icon: Clock, label: "Shelf Life", value: product.shelfLife },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Breadcrumb */}
      <section className="pt-20 sm:pt-28 pb-4 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-slate hover:text-signal-teal transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </section>

      {/* Product Detail */}
      <section className="pb-16 sm:pb-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Left: Product Info */}
            <div className="lg:col-span-2">
              <SectionReveal>
                {/* Product image */}
                <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-mist to-paper mb-8 flex items-center justify-center border border-mist relative overflow-hidden">
                  {product.variants && product.variants.length > 0 ? (
                    <ImageSlider
                      images={product.variants.map((v) => v.image)}
                      alt={product.name}
                      className="w-full h-full"
                      imageClassName="object-cover"
                      autoPlay={true}
                      interval={4000}
                    />
                  ) : product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <Package size={80} className="text-slate/20" />
                  )}
                </div>

                {/* Category tag */}
                <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-signal-teal/10 text-signal-teal mb-4">
                  {product.category}
                </span>

                <h1 className="text-display-lg text-ink mb-4">
                  {product.name}
                </h1>

                <p className="text-body-lg text-slate mb-8">
                  {product.longDescription}
                </p>

                {/* Specifications Table */}
                <div className="mb-12">
                  <h2 className="text-display-md !text-xl text-ink mb-6">
                    Specifications
                  </h2>
                  <div className="border border-mist rounded-xl overflow-hidden">
                    {specs.map((spec, i) => (
                      <div
                        key={spec.label}
                        className={`flex items-start gap-4 p-5 ${
                          i !== specs.length - 1 ? "border-b border-mist" : ""
                        }`}
                      >
                        <spec.icon
                          size={20}
                          className="text-signal-teal mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm font-medium text-ink">
                            {spec.label}
                          </p>
                          <p className="text-sm text-slate mt-1">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-display-md !text-xl text-ink mb-6">
                      Available Variants
                    </h2>
                    <div className="border border-mist rounded-xl overflow-hidden divide-y divide-mist">
                      {product.variants.map((variant) => (
                        <div key={variant.name} className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-mist flex-shrink-0 bg-white">
                            <Image src={variant.image} alt={variant.name} fill className="object-cover" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-ink">{variant.name}</h3>
                            <p className="text-sm text-slate mt-1">{variant.composition}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                <div>
                  <h2 className="text-display-md !text-xl text-ink mb-6">
                    Certifications
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {product.certifications.map((cert) => (
                      <div
                        key={cert}
                        className="glass-card px-5 py-3 flex items-center gap-2"
                      >
                        <Shield size={16} className="text-signal-teal" />
                        <span className="text-sm font-medium text-ink">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Right: Sticky Sidebar CTA */}
            <div className="lg:col-span-1 order-first lg:order-last">
              <div className="lg:sticky lg:top-24">
                <div className="glass-card p-6 sm:p-8">
                  <h3 className="text-display-md !text-lg text-ink mb-3">
                    Request a Quote
                  </h3>
                  <p className="text-body-sm text-slate mb-6">
                    Interested in {product.name}? Submit a quote request and our
                    team will get back to you within 24 hours with institutional
                    pricing.
                  </p>

                  <Link
                    href={`/contact?product=${encodeURIComponent(product.name)}`}
                    className="btn-capsule btn-primary w-full mb-4"
                  >
                    Request Quote for This Product
                  </Link>

                  <Link
                    href="/contact"
                    className="btn-capsule btn-secondary w-full"
                  >
                    General Enquiry
                  </Link>

                  <div className="mt-6 pt-6 border-t border-mist">
                    <p className="text-xs text-slate">
                      MOQ: <span className="font-medium text-ink">{product.moq}</span>
                    </p>
                    <p className="text-xs text-slate mt-2">
                      All orders require a valid Drug License and GST
                      registration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-24">
              <SectionReveal>
                <h2 className="text-display-lg text-ink mb-8">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </SectionReveal>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
