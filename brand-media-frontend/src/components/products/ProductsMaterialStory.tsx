"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function ProductsMaterialStory() {
  const locale = useLocale();
  const { productsPage } = getMockData(locale);
  const { materialStory } = productsPage;

  return (
    <section className="py-16 md:py-32 px-6 md:px-12 bg-background overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left: text — shows first on mobile */}
          <div className="space-y-8 order-1">
            <FadeIn direction="up">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-outline" />
                <span className="text-[10px] tracking-[0.45em] uppercase text-outline/60">{materialStory.tag}</span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <h2
                className="font-serif text-primary"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
              >
                {materialStory.title}
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="text-on-surface-variant leading-[1.9] text-sm md:text-base font-light">
                {materialStory.description}
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <Link
                href="/materials"
                className="inline-flex items-center gap-4 text-[10px] md:text-xs tracking-[0.2em] uppercase border border-primary text-primary px-6 md:px-8 py-3 md:py-4 hover:bg-primary hover:text-on-primary transition-all duration-300"
              >
                {materialStory.cta}
                <span className="text-primary/50">→</span>
              </Link>
            </FadeIn>
          </div>

          {/* Right: image — shows below on mobile */}
          <FadeIn direction="up" delay={0.15} className="relative order-2">
            <div className="aspect-[4/3] overflow-hidden relative group cursor-pointer">
              <Image
                className="object-cover transform group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                alt={materialStory.title}
                src={materialStory.image}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative offset — desktop only */}
            <div className="hidden lg:block absolute -bottom-8 -right-8 w-1/2 h-1/2 bg-surface-container -z-10" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
