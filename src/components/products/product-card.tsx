"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ImageSlider } from "@/components/shared/image-slider";
import type { Product } from "@/data/products";
import { ArrowUpRight, Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [6, -6]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-6, 6]), {
    stiffness: 200,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReducedMotion
          ? {}
          : {
              rotateX,
              rotateY,
              transformPerspective: 800,
            }
      }
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="glass-card p-6 h-full transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,178,160,0.12)] relative overflow-hidden">
          {/* Teal glow on hover */}
          <div className="absolute -inset-1 bg-signal-teal/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

          <div className="relative z-10">
            {/* Product image */}
            <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-mist to-paper mb-4 flex items-center justify-center overflow-hidden relative">
              {product.variants && product.variants.length > 0 ? (
                <ImageSlider
                  images={product.variants.map((v) => v.image)}
                  alt={product.name}
                  className="w-full h-full"
                  imageClassName="object-cover group-hover:scale-105 transition-transform duration-500"
                  autoPlay={true}
                  interval={3000}
                />
              ) : product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <Package size={48} className="text-slate/30" />
              )}
            </div>

            {/* Category tag */}
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-signal-teal/10 text-signal-teal mb-3">
              {product.category}
            </span>

            {/* Name */}
            <h3 className="text-display-md !text-lg font-semibold text-ink mb-2 group-hover:text-signal-teal transition-colors">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-body-sm text-slate line-clamp-2 mb-4">
              {product.shortDescription}
            </p>

            {/* View Details */}
            <div className="flex items-center text-sm font-medium text-signal-teal group-hover:gap-2 transition-all">
              View Details
              <ArrowUpRight
                size={16}
                className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
