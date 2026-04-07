"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function ProductStory() {
  const locale = useLocale();
  const { productStory } = getMockData(locale);

  if (!productStory) return null;

  return (
    <section className="py-16 md:py-32 bg-background overflow-hidden">
      <FadeIn direction="up">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-serif text-primary mb-3 md:mb-4">{productStory.title}</h2>
          <p className="text-accent-cool uppercase tracking-widest text-xs">{productStory.artifactRef}</p>
        </div>
      </FadeIn>
      
      {/* Mobile: stacked. Desktop: 3-column grid */}
      <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-8 px-6 md:px-12 md:h-[716px]">
        <FadeIn direction="up" delay={0.1} className="md:h-full">
          <div className="h-64 md:h-full overflow-hidden relative group cursor-pointer">
            <Image 
              className="object-cover transform group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-[0.25,0.46,0.45,0.94] will-change-transform" 
              alt="Product Focus" 
              src={productStory.imageLeft} 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.2} className="md:h-full">
          <div className="overflow-hidden flex flex-col justify-center bg-accent-warm/20 p-8 md:p-12 space-y-4 md:space-y-6 md:h-full">
            <p className="text-on-surface-variant leading-relaxed italic text-base md:text-lg text-left">
              {productStory.description}
            </p>
            <div className="w-16 h-px bg-outline/30"></div>
            <p className="text-primary-container text-sm tracking-wide">
              {productStory.meta}
            </p>
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.3} className="md:h-full">
          <div className="h-64 md:h-full overflow-hidden relative group cursor-pointer">
            <Image 
              className="object-cover transform group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-[0.25,0.46,0.45,0.94] will-change-transform" 
              alt="Product Detail" 
              src={productStory.imageRight} 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
