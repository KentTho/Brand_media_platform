"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function ProductsFeatured() {
  const locale = useLocale();
  const { productsPage } = getMockData(locale);
  const { featuredProduct } = productsPage;

  return (
    <section className="py-16 md:py-32 px-6 md:px-12 overflow-hidden bg-background">
      <div className="max-w-[1920px] mx-auto">
        {/* Editorial label */}
        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-10 md:mb-20">
            <div className="w-6 h-px bg-outline" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-outline/60">
              {featuredProduct.tag}
            </span>
          </div>
        </FadeIn>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left: Large image */}
          <FadeIn direction="up" className="relative">
            <div className="aspect-[3/4] overflow-hidden relative group cursor-pointer">
              <Image
                className="object-cover transform group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                alt={featuredProduct.title}
                src={featuredProduct.image}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Artifact number — top left overlay */}
            <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm px-4 py-2">
              <span className="text-[9px] tracking-[0.35em] text-on-primary uppercase">{featuredProduct.artifactNo}</span>
            </div>
            {/* Decorative offset — desktop */}
            <div className="hidden lg:block absolute -bottom-8 -right-8 w-1/2 h-1/2 bg-surface-container -z-10" />
          </FadeIn>

          {/* Right: Editorial narrative text */}
          <div className="space-y-7 md:space-y-10">
            {/* Subtitle — italic small */}
            <FadeIn direction="up" delay={0.1}>
              <p className="text-[10px] md:text-xs tracking-[0.45em] uppercase text-outline/60">{featuredProduct.subtitle}</p>
            </FadeIn>

            {/* Main title */}
            <FadeIn direction="up" delay={0.15}>
              <h2
                className="font-serif text-primary italic leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                {featuredProduct.title}
              </h2>
            </FadeIn>

            {/* Description */}
            <FadeIn direction="up" delay={0.2}>
              <p className="text-on-surface-variant leading-[1.9] text-sm md:text-base font-light">
                {featuredProduct.description}
              </p>
            </FadeIn>

            {/* Meta */}
            <FadeIn direction="up" delay={0.25}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-px bg-outline/30" />
                <span className="text-outline text-xs tracking-wide">{featuredProduct.meta}</span>
              </div>
            </FadeIn>

            {/* CTA */}
            <FadeIn direction="up" delay={0.3}>
              <a
                href="#"
                className="inline-flex items-center gap-4 px-7 md:px-8 py-3 md:py-4 bg-primary text-on-primary text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-secondary transition-colors duration-300 cursor-pointer"
              >
                {featuredProduct.cta}
                <span className="text-on-primary/50">→</span>
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
