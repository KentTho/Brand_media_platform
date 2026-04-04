"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function ProductsGrid() {
  const locale = useLocale();
  const { productsPage } = getMockData(locale);
  const { products } = productsPage;

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-surface-container-low overflow-hidden">
      <div className="max-w-[1920px] mx-auto">

        {/* Section header */}
        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-12 md:mb-20">
            <div className="w-6 h-px bg-outline" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-outline/60">OBJECTS OF QUIET INTENT</span>
          </div>
        </FadeIn>

        {/* Product grid — alternating layout */}
        <div className="space-y-16 md:space-y-32">
          {products.map((product, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center group cursor-pointer"
              >
                {/* Image */}
                <FadeIn
                  direction="up"
                  delay={0.05}
                  className={`md:col-span-6 lg:col-span-5 relative ${isEven ? 'order-1' : 'order-1 md:order-2'}`}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <Image
                      className="object-cover transform group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                      alt={product.title}
                      src={product.image}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                    {/* Tag */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  {/* Artifact number */}
                  <div className="absolute top-4 left-4 bg-surface/95 backdrop-blur-sm px-3 py-1.5">
                    <span className="text-[9px] tracking-[0.3em] text-outline uppercase">{product.artifactNo}</span>
                  </div>
                </FadeIn>

                {/* Text  */}
                <div
                  className={`md:col-span-6 lg:col-span-7 space-y-5 md:space-y-6 ${isEven ? 'order-2 md:pl-8 lg:pl-16' : 'order-2 md:order-1 md:pr-8 lg:pr-16'}`}
                >
                  <FadeIn direction="up" delay={0.1}>
                    <span className="text-[9px] tracking-[0.4em] uppercase text-outline/60">{product.tag}</span>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.15}>
                    <h3
                      className="font-serif text-primary italic leading-tight"
                      style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                    >
                      {product.title}
                    </h3>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.2}>
                    <p className="text-on-surface-variant text-sm leading-[1.85] font-light">
                      {product.description}
                    </p>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.25}>
                    <a href="#" className="inline-flex items-center gap-3 text-primary font-serif italic text-sm border-b border-primary/40 pb-0.5 hover:border-primary transition-all group-hover:gap-5">
                      Khám phá <span className="text-primary/50">→</span>
                    </a>
                  </FadeIn>

                  {/* Decorative thin rule */}
                  <div className="w-24 h-px bg-outline/20 mt-4 md:mt-8" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
