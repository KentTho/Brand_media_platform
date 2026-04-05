"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function MaterialsHero() {
  const locale = useLocale();
  const { materialsPage } = getMockData(locale);
  const { hero } = materialsPage;

  return (
    <section className="pt-24 md:pt-32 pb-0 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">

        {/* Top tag */}
        <FadeIn direction="up">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="w-6 h-px bg-outline"></div>
            <span className="text-xs tracking-[0.35em] uppercase text-outline font-light">
              {hero.tag}
            </span>
          </div>
        </FadeIn>

        {/* Two-column layout: text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">

          {/* Left: Story headline */}
          <div className="space-y-5 md:space-y-8">
            <FadeIn direction="up" delay={0.1}>
              <p className="text-[10px] tracking-[0.5em] uppercase text-outline/70 font-medium">
                {hero.storyLabel}
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <h1
                className="font-serif text-on-background leading-[1.06] tracking-tight"
                style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)' }}
              >
                {hero.title}
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <p className="text-on-surface-variant leading-[1.85] text-base md:text-lg font-light max-w-lg">
                {hero.description}
              </p>
            </FadeIn>
          </div>

          {/* Right: hero image with offset */}
          <FadeIn direction="up" delay={0.15} className="relative">
            <div className="aspect-[4/3] overflow-hidden relative group cursor-pointer">
              <Image
                className="object-cover transform group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-out"
                alt={hero.title}
                src={hero.image}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Decorative offset block — desktop only */}
            <div className="hidden lg:block absolute -bottom-6 -right-6 w-1/2 h-1/2 bg-surface-container -z-10"></div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
